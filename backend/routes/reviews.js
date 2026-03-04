const express = require('express');
const router = express.Router();
const db = require('../db');
const  { getReviews, submitReview, checkReview, checkNumberOfComments } = require("../services/reviewService");
const { authenticateToken } = require('../middleware/authenticate');

router.get('/:product_id', async (req, res) => {
    const product_id = req.params.product_id;
    try{
        const result = await getReviews(product_id);
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).json({message: "server error"});
    }
})

router.post('/submit/:product_id', authenticateToken, async (req, res) => {
    const user_id = req.user.id;
    const product_id = req.params.product_id;
    const { comment, review, title } = req.body;
    try {
        await checkNumberOfComments(product_id, user_id);
        const result = await checkReview(product_id, user_id);
        if(result.length === 0){
            return res.status(403).json({message: "Havent bought this product"})
        }
        await submitReview(user_id, product_id, comment, review, title);
        res.json({message: "Review Submited!"})
    }catch(err){
        console.error(err);
        res.status(500).json({message: "server error"});
    }
})

router.get('/check/:product_id', authenticateToken, async (req, res) => {
    const user_id = req.user.id;
    const product_id = req.params.product_id;
    try {
        await checkNumberOfComments(product_id, user_id);
        const result = await checkReview(product_id, user_id);
        res.json({ allowed: result.length > 0});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "server error"});
    }
})

module.exports = router;