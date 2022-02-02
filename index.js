require('dotenv').config()
const fs = require('fs');
const express = require("express");
const cors = require('cors')
const cookieSession = require('cookie-session')
const bcrypt = require('bcrypt')
const uuid = require('uuid');
const bodyParser = require('body-parser')
const app = express();
const stripe = require('stripe')(process.env.REACT_APP_PRIVATE_KEY);
const path = require('path');
const StripQuotes = require('concurrently/src/command-parser/strip-quotes');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
let theCookie

app.use(express.json())

const genreateRandomId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
}

app.use(cors())
// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://nordiccauldron.herokuapp.com/', 'http://localhost:3000/api/create-checkout-session', "https://checkout.stripe.com/pay/", 'http://localhost:3001/api/session/verify']
const corsOptions = {
    origin: function (origin, callback) {
        console.log("** Origin of request " + origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin rejected")
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))


app.get("/api/product", (req, res) => {
    let raw = fs.readFileSync("myDB.json")
    let data = JSON.parse(raw)
    const mydata = data.product
    res.json(mydata)
});

app.get("/api/user", (req, res) => {
    let raw = fs.readFileSync("myDB.json")
    let data = JSON.parse(raw)
    const mydata = data.user
    res.json(mydata)
});

app.use(cookieSession({
    secret: genreateRandomId(),
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: "strict",
    httpOnly: true,
    secure: false
}))

app.post("/api/login", async (req, res) => {
    console.log(req.body)
    let raw = fs.readFileSync("myDB.json")
    let data = JSON.parse(raw)
    const myData = data.user

    const user = myData.find(user => user.email === req.body.email)
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        res.json(false)
    }

    if (req.session.id) {
        return res.json("already logged in")
    }



    req.session.id = uuid.v4()
    req.session.username = user.username
    req.session.userID = user.id
    req.session.loginDate = new Date()
    req.session.role = undefined //later installment for role

    const userInfo = [{ id: user.id, customer: user.customerId, role: user.role, username: req.session.username, email: user.email, prevOrder: user.previousOrder, cart: user.cart }];
    theCookie = req.session
    res.json(userInfo)
})

app.get('/api/login', (req, res) => {
    //Check if logged in
    if (!req.session.id) {
        return res.status(401).json("you are not logged in")
    }
    res.json(req.session)

})

app.get('/api/userCheck/', async (req, res) => {
    if (theCookie !== null) {
        console.log("The cookie", req.session)
        return res.json(true)
    } else {
        return res.json(false)
    }

})

app.post('/api/getCart', (req, res) => {
    let raw = fs.readFileSync("myDB.json")
    let data = JSON.parse(raw)
    const users = data.user
    const user = users.find(user => user.email === req.body.user)
    if (!user) {
        res.json("user not correct")
    } else {
        user.cart.push(req.body.cart)
        fs.writeFileSync("myDB.json", JSON.stringify(data))
        res.json(user.cart)
    }
})

app.delete("/api/delete", async (req, res) => {
    theCookie = null
    res.json(true)
})

app.post("/api/newUser", async (req, res) => {
    let raw = fs.readFileSync("myDB.json")
    let data = JSON.parse(raw)
    //const myData = data.user
    console.log("myData =>", data.user)
    if (data.user.find(user => user.email === req.body.email)) {
        return res.status(409).json("Username already in use")
    } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        data.user.push({
            id: req.body.id,
            customerId: "TESTID",
            role: "customer",
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            adress: "Adress",
            zip: "Zip",
            city: "Stad",
            country: "Land",
            cart: [],
            previousOrder: []
        })
        fs.writeFileSync("myDB.json", JSON.stringify(data))
        const userId = req.body.id
        res.status(200).json("user created")
    }
})
//fake products


app.post("/create-checkout-session", async (req, res) => {

    let raw = fs.readFileSync("myDB.json")
    let data = JSON.parse(raw)
    const products = data.product

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                const storeItem = products.find(product => product.id == item.id)
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: storeItem.name,
                        },
                        unit_amount: storeItem.price,
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${process.env.REACT_APP_CLIENT_URL}`,
            cancel_url: `${process.env.REACT_APP_CLIENT_URL}`,
        })
        // res.json({ url: session.url })
        res.json({ id: session.id })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

})


/* app.post("/api/verify", (req, res) => {
    console.log("pratar med server")
    const sessionId = req.body.sessionId;
    console.log(sessionId)
    res.json("pratar med server") */
/*     const session = await stripe.checkout.sessions.retrive(sessionId);
   if (session.payment_status == "paid") {
       console.log("paid is true")
       res.json(true)
   }
   res.json({ id: session.id });
   console.log(session) */
/* }) */


app.use(express.static('public'));
app.use('/images', express.static('images'));


app.use(express.static(path.join(__dirname, "client/build")));

app.get('*', (req, res) => {
    req.sendFile(path.join(__dirname, "client/build", "index.html"))
});




const PORT = process.env.PORT || 3001;



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});