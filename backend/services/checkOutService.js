const db = require("../db")

function createOrder(user_id, status){
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO orders (user_id, status) VALUE (?, ?)";
        db.query(sql, [user_id, status], (err, result) => {
            if (err){
                console.error(err)
                return reject(err)
            }
            resolve(result);
        })

    })
}

function addToOrder(order_id, product_id, quantity){
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO order_item (order_order_id, product_id, quantity) 
            VALUES (?, ?, ?)`;
        db.query(sql, [order_id, product_id, quantity], (err, result) => {
            if(err) {
                console.error(err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

function updateStock(product_id, quantity){
    return new Promise((resolve, reject) => {
        const sql = `UPDATE products SET stock = stock - ? WHERE product_id = ? AND stock >= ?`;
        db.query(sql, [quantity, product_id, quantity], (err, result) => {
            if(err){
                console.error(err);
                return reject(err);
            }
            // If there isnt enough in stock, no rows were affected
            if(result.affectedRows === 0){
                return reject(new Error("Not enough in stock"));
            }
            resolve(result)
        })
    })
}



module.exports = {
    createOrder,
    addToOrder,
    updateStock
}

