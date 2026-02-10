const express = require('express');
const router = express.Router();
const db = require('../db');
const { createBasketForUser, updateQuantityBasket, addToBasket, removeFromBasket } = require('../services/basketService');
const { authenticateToken } = require('../middleware/authenticate');

// Get all products in the user's basket
router.get('/', authenticateToken, async (req, res) => {
    const user_id = req.user.id;
    try {
        const sql = 'SELECT p.product_id, p.name, p.description, p.price, p.stock, p.type, p.image, bi.quantity FROM products p JOIN basket_item bi ON p.product_id = bi.product_id JOIN basket b ON bi.basket_basket_id = b.basket_Id WHERE b.user_id = ?';
        db.query(sql, [user_id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({message: "server error"});
            }
            res.json(result);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "server error"});
    }
});

router.post('/add', authenticateToken, async (req, res) => {
    const user_id = req.user.id;
    const { product_id, quantity } = req.body;
    try {
        await addToBasket(user_id, product_id, quantity);
        res.json({message: "Product added to basket"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "server error"});   
    }
});

router.post('/update', authenticateToken, async (req, res) => {
    const user_id = req.user.id;
    const { product_id, quantity } = req.body;
    try {
        await updateQuantityBasket(user_id, product_id, quantity);
        res.json({message: "Basket updated"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "server error"});   
    }
});

router.delete('/remove/:product_id', authenticateToken, async (req, res) => {
    const user_id = req.user.id;
    const { product_id } = req.params; 
    try {
        await removeFromBasket(user_id, product_id);
        res.json({message: "Product removed from basket"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "server error"});   
    }
});

module.exports = router;