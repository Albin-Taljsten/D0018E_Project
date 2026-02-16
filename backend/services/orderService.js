const { resolve } = require('chart.js/helpers');
const db = require('../db');

function getAllOrders(user_id){
    return new Promise((resolve, reject) => {
        const sql = `SELECT o.order_id, o.orderDate, o.status, 
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
                        orderDate: row.orderDate,
                        status: row.status,
                        items: []
                    });
                }
                ordersMap.get(row.order_id).items.push({
                    order_item_id:row.order_item_id,
                    product_id:row.product_id,
                    name: row.name,
                    price: row.price,
                    quantity: row.quantity
                })
            })
            resolve(Array.from(ordersMap.values()));
        });
    });
};


module.exports = {
    getAllOrders
}

