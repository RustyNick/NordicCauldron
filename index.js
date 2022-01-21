const fs = require('fs');
const express = require("express");
const app = express();


const path = require('path');



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

const PORT = process.env.PORT || 3001;

/* if (process.env.NODE_ENV === "production") {
    app.use(express.static("public"));
    app.get('*', (req, res) => {
        req.sendFile(path.resolve(__dirname, "public", "index.html"))
    })
} */

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});