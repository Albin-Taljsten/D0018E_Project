const express = require('express');
const router = express.Router();
const db = require('../db');
const { getAllOrders, getOrder} = require("../services/orderService")
const { authenticateToken } = require('../middleware/authenticate');


router.get('/', authenticateToken, async (req, res) => {
    const user_id = req.user.id;
    try {
        const orders = await getAllOrders(user_id);
        res.json(orders)
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "server error"});
    }
});

router.get('/:order_id', authenticateToken, async (req, res) => {
    const user_id = req.user.id;
    const order_id = req.params.order_id;
    try{
        const order = await getOrder(order_id, user_id);
        res.json(order)
    }catch (err) {
        console.error(err);
        res.status(500).json({message: "server error"});
    }
});
module.exports = router;