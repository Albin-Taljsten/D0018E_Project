const express = require('express');
const router = express.Router();
const db = require('../db');
const { createOrder, addToOrder, updateStock} = require("../services/checkOutService")
const { authenticateToken } = require("../middleware/authenticate")
const { removeFromBasket }  = require("../services/basketService")

router.post("/", authenticateToken, async (req, res) => {
    const user_id = req.user.id;
    const { basket_items } = req.body 

    try {

        const orderResult = await createOrder(user_id, "active");
        const order_id = orderResult.insertId;

        for(const item of basket_items){
            await updateStock(item.product_id, item.quantity);
            await addToOrder(order_id, item.product_id, item.quantity);
            await removeFromBasket(user_id, item.product_id);

        }

        res.json({message: "Order created"})

    }catch (err){
        console.error(err);
        res.status(400).json({message: err.message});
    }
})

module.exports = router;