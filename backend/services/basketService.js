const db = require('../db');

function createBasketForUser(user_id) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO basket (user_id) VALUES (?)';
        db.query(sql, [user_id], (err, result) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

function updateQuantityBasket(user_id, product_id, quantity) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE basket_item SET quantity = ? WHERE basket_basket_id = (SELECT basket_id FROM basket WHERE user_id = ?) AND product_id = ?';
        db.query(sql, [quantity, user_id, product_id], (err, result) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(result);
        });
    });
}


function addToBasket(user_id, product_id, quantity) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO basket_item (basket_basket_id, product_id, quantity) 
            VALUES ((SELECT basket_id FROM basket WHERE user_id = ?), ?, ?) 
            ON DUPLICATE KEY UPDATE 
                quantity = quantity + VALUES(quantity)`;
        db.query(sql, [user_id, product_id, quantity], (err, result) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

function removeFromBasket(user_id, product_id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM basket_item WHERE basket_basket_id = (SELECT basket_id FROM basket WHERE user_id = ?) AND product_id = ?';
        db.query(sql, [user_id, product_id], (err, result) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

function getBasketItem(user_id, product_id){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM basket_item WHERE basket_basket_id = (SELECT basket_id FROM basket WHERE user_id = ?) AND product_id = ?`;
        db.query(sql,[user_id, product_id], (err, result) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(result);
        })
    })
}


module.exports = {
    createBasketForUser,
    updateQuantityBasket,
    addToBasket,
    removeFromBasket,
    getBasketItem
};