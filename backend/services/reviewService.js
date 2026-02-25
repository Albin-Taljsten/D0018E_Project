const db = require('../db');

function getReviews(product_id){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM comments WHERE product_id = ?`
        db.query(sql, [product_id], (err, result) => {
            if(err){
            console.error(err);
            return reject(err);
        }
        resolve(result);

        })
    })
}

function submitReview(user_id, product_id, comment, review, title){
    return new Promise((resolve, reject) => {
        const sqlCheck = `SELECT 1
                          FROM order_item oi
                          JOIN orders o ON o.order_id = oi.order_order_id
                          WHERE o.user_id = ?
                          AND oi.product_id = ?
                          LIMIT 1`;
        db.query(sqlCheck, [user_id, product_id], (err, result) => {
            if(err){
                return reject(err);
            }
            if(result.length === 0){
                return reject(new Error("User has not bought this product"));
            }
            const sql = `INSERT INTO comments 
                    (user_id, comment, review, title, product_id)
                    VALUES (?, ?, ?, ?, ?)`
            db.query(sql, [user_id, comment, review, title, product_id], (err, result) => {
                if(err){
                    return reject(err);
                }
                resolve(result);
            })
        })
    })
}

module.exports = {
    getReviews,
    submitReview
}