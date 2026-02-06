const express = require('express');
const router = express.Router();
const db = require('../db');

router.get("/:productName", (req, res) => {
    const { productName } = req.params;

    const query = 'SELECT * FROM products WHERE name = ?';

    db.query(query, [productName], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json(result[0]);
    });
});

module.exports = router;