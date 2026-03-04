const db = require('../db');

function getReviews(product_id){
    return new Promise((resolve, reject) => {
        const sql = `SELECT c.comment_id, c.comment, c.review, c.date, c.title, c.user_id, c.product_id, u.name
                     FROM comments c 
                     JOIN users u ON c.user_id = u.user_id
                     WHERE c.product_id = ?
                     ORDER BY c.date DESC`
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
}

function checkReview(product_id, user_id){
    return new Promise((resolve, reject) => {
        const sql = `SELECT 1
                          FROM order_item oi
                          JOIN orders o ON o.order_id = oi.order_order_id
                          WHERE o.user_id = ?
                          AND oi.product_id = ?
                          LIMIT 1`;
        db.query(sql, [user_id, product_id], (err, result) => {
            if(err){
                return reject(err);
            }
            resolve(result)
        })
    })
}

function checkNumberOfComments(product_id, user_id){
    return new Promise((resove, reject) => {
        const sqlCheck = `SELECT 1 FROM comments
                     WHERE user_id = ?
                     AND product_id = ?
                     LIMIT 1`
        db.query(sqlCheck, [user_id, product_id], (err, result) => {
            if(err){
                return reject(err);
            }
            if(result.length > 0){
                return reject(new Error("Customer already commented on product"));
            }
            resove(result)
        })
    })
}


module.exports = {
    getReviews,
    submitReview,
    checkReview,
    checkNumberOfComments
}