const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json())

app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
        if (err) res.json({ message: "server error" });
        return res.json(result)
    })
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`))