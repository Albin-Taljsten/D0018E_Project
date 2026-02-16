const express = require('express');
const router = express.Router();
const db = require('../db');
const { getAllOrders} = require("../services/orderService")
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

module.exports = router;