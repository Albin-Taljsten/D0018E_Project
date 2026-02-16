const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken } = require("../middleware/authenticate");
const { addToFavorites, removeFromFavorites } = require("../services/favoritesService");

router.get('/', authenticateToken, async (req, res) => {
    const user_id = req.user.id;
    try {
        const sql = `SELECT 
                    p.product_id, 
                    p.name, 
                    p.description, 
                    p.price, 
                    p.stock, 
                    p.type, 
                    p.image 
                    FROM products p 
                    JOIN favorite_item fi 
                        ON p.product_id = fi.product_id 
                    JOIN favorites f 
                        ON fi.favorites_favorites_id = f.favorites_id 
                    WHERE f.user_id = ?`;
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

router.post('/add/:product_id', authenticateToken, async (req, res) => {
    const user_id        = req.user.id;
    const { product_id } = req.params;

    try {
        await addToFavorites(user_id, product_id);
        res.json({message: "Product added to favorites"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "server error"});   
    }
});

router.delete('/remove/:product_id', authenticateToken, async (req, res) => {
    const user_id = req.user.id;
    const { product_id } = req.params; 

    try {
        await removeFromFavorites(user_id, product_id);
        res.json({message: "Product removed from favorites"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "server error"});   
    }
});

module.exports = router;