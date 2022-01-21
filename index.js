const fs = require('fs');
const express = require("express");
const cors = require('cors')
const app = express();

app.use(cors())
const path = require('path');

// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://nordiccauldron.herokuapp.com/']
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

app.get("/api/getCart", (req, res) => {
    let raw = fs.readFileSync("myDB.json")
    let data = JSON.parse(raw)
    const mydata = data.user
    console.log(mydata)
    res.json(mydata)
});

app.post("/api/user/:id", (req, res) => {
    const item = req.params.id
    let raw = fs.readFileSync("myDB.json")
    let data = JSON.parse(raw)
    const mydata = data.user
    const newData = mydata.map(item => { return item.cart })
    console.log(newData)
    newData.push(req.body)
    fs.writeFileSync("myDB.json", JSON.stringify(data))
    res.json(newData)

})


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