const express = require('express');
const router = express.Router();
const db = require('../db');
const { createOrder, addToOrderItem, updateStock, addToOrder} = require("../services/checkOutService")
const { authenticateToken } = require("../middleware/authenticate")
const { removeFromBasket }  = require("../services/basketService")
const { getPriceFromProduct } = require("../services/productsService")

router.post("/", authenticateToken, async (req, res) => {
    const user_id = req.user.id;
    const { basket_items } = req.body 

    try {

        const orderResult = await createOrder(user_id, "active");
        const order_id = orderResult.insertId;
        let total_price = 0;
        for(const item of basket_items){
            const product = await getPriceFromProduct(item.product_id);
            const price = product[0].price;
            total_price += price * item.quantity;
            await updateStock(item.product_id, item.quantity);
            await addToOrderItem(order_id, item.product_id, item.quantity);
            await removeFromBasket(user_id, item.product_id);

        }
        await addToOrder(order_id, total_price);

        res.json({message: "Order created"})

    }catch (err){
        console.error(err);
        res.status(400).json({message: err.message});
    }
})

module.exports = router;