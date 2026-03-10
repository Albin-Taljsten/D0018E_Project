const express = require('express');
const router = express.Router();
const db = require('../db');
const { addProduct, deleteProduct, getTypeSpecificProducts, updateProduct } = require("../services/productsService");
const { authenticateAdmin, authenticateToken } = require('../middleware/authenticate');

router.get('/', (req, res) => {
    db.query('SELECT * FROM products WHERE is_active = 1', (err, result) => {
        if (err) res.json({ message: "server error" });
        return res.json(result)
    })
});

router.get('/filter', async (req, res) => {
    const type = req.query.type;
    if (!type) return res.status(400).json({ message: "Type is required" });

    try {
        const products = await getTypeSpecificProducts(type);
        res.status(200).json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
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

router.post('/update/:product_id', authenticateToken, authenticateAdmin, async (req, res) => {
    const {name, description, price, stock, type, image} = req.body;
    const product_id = req.params.product_id;
    try{
        await updateProduct(product_id, name, description, price, stock, type, image);
        res.status(200).json({message: "Product updated!"})
    }catch(err){
        console.error("UPDATE ERROR:", err);
        res.status(500).json({message: "server error"});
    }
})

module.exports = router;