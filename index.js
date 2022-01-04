const fs = require('fs');
const express = require("express");

const app = express();

app.get("/api/customers", (req, res) => {
    const customers = [
        { id: 1, firstname: 'Grex', lastname: 'Grootgram' },
        { id: 2, firstname: 'Nathan', lastname: 'Casimir' },
        { id: 3, firstname: 'Mir', lastname: 'Moth' }
    ];
    res.json(customers);
});

app.get("/api/product", (req, res) => {
    let raw = fs.readFileSync("myDB.json")
    let data = JSON.parse(raw)
    const mydata = data.product
    res.json(mydata)
});

app.use(express.static('public'));
app.use('/images', express.static('images'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});