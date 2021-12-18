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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});