
const db = require('../db');

function getAllOrders(user_id){
    return new Promise((resolve, reject) => {
        const sql = `SELECT o.order_id, o.order_date, o.status, o.total_price,
                            p.product_id, p.name, p.price, oi.quantity, oi.order_item_id 
                     FROM orders o 
                     JOIN order_item oi ON o.order_id = oi.order_order_id 
                     JOIN products p ON p.product_id = oi.product_id 
                     WHERE o.user_id = ?
                     ORDER BY o.order_id DESC`
        db.query(sql, [user_id], (err, rows) => {
            if (err){
                console.error(err);
                return reject(err);
            }
            const ordersMap = new Map();

            rows.forEach(row => {
                if(!ordersMap.has(row.order_id)){
                    ordersMap.set(row.order_id, {
                        order_id: row.order_id,
                        order_date: row.order_date,
                        status: row.status,
                        total_price: row.total_price,
                        items: []
                    });
                }
                ordersMap.get(row.order_id).items.push({
                    order_item_id: row.order_item_id,
                    product_id: row.product_id,
                    name: row.name,
                    price: row.price,
                    quantity: row.quantity
                })
            })
            resolve(Array.from(ordersMap.values()));
        });
    });
};

function getOrder(order_id, user_id){
    return new Promise((resolve, reject) => {
        const sql = `SELECT o.order_id, o.order_date, o.status, o.total_price,
                            p.product_id, p.name, p.price, p.image, oi.quantity, oi.order_item_id 
                     FROM orders o 
                     JOIN order_item oi ON o.order_id = oi.order_order_id 
                     JOIN products p ON p.product_id = oi.product_id 
                     WHERE o.order_id = ?
                     AND o.user_id = ?`;
        db.query(sql, [order_id, user_id], (err, rows) => {
            if (err){
                console.error(err);
                return reject(err);
            }
            if(rows.length === 0){
                return resolve(null);
            }
            const order = {
                order_id: rows[0].order_id,
                order_date: rows[0].order_date,
                status: rows[0].status,
                total_price: rows[0].total_price,
                items: []
            };
            rows.forEach(row => {
                order.items.push({
                    order_item_id: row.order_item_id,
                    product_id: row.product_id,
                    name: row.name,
                    price: row.price,
                    quantity: row.quantity,
                    image: row.image
                });
            });

            resolve(order);
        });
    });
}


module.exports = {
    getAllOrders,
    getOrder
}

