const express = require('express');
const router = express.Router();
const db = require('../db');
const { addProduct,deleteProduct } = require("../services/productsService");
const { authenticateAdmin, authenticateToken } = require('../middleware/authenticate');

router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
        if (err) res.json({ message: "server error" });
        return res.json(result)
    })
});

router.post('/add', authenticateToken, authenticateAdmin, async (req, res) => {
    const {name, description, price, stock, type, image} = req.body;
    try{
        await addProduct(name, description, price, stock, type, image);
        res.status(200).json({message: "Product added"})
    }catch(err) {
        console.error(err);
        res.status(500).json({message: "server error"});
    }
})
router.delete('/delete/:product_id', authenticateToken, authenticateAdmin, async (req, res) => {
    const product_id = req.params.product_id;
    try{
        await deleteProduct(product_id);
        res.status(200).json({message: "Product deleted!"})
    }catch(err){
        console.error("DELETE ERROR:", err);
        res.status(500).json({message: "server error"});
    }
})

module.exports = router;