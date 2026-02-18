
const db = require('../db');

function addProduct(name, description, price, stock, type, image) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO products (name, description, price, stock, type, image) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [name, description, price, stock, type, image], (err, result) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

function deleteProduct(product_id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM products WHERE product_id = ?';
        db.query(sql, [product_id], (err, result) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

function updateProduct(product_id, name, description, price, stock, type, image) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, type = ?, image = ? WHERE product_id = ?';
        db.query(sql, [name, description, price, stock, type, image, product_id], (err, result) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

function getPriceFromProduct(product_id){
    return new Promise((resolve, reject) => {
        const sql = `SELECT price FROM products WHERE product_id = ?`;
        db.query(sql, [product_id], (err, result) => {
            if (err){
                console.error(err);
                return reject(err);
            }
            resolve(result)
        })
    })
}
function checkStock(product_id){
    return new Promise((resolve, reject) => {
        const sql = "SELECT stock FROM products WHERE product_id = ?"
        db.query(sql, [product_id], (err, result) => {
            if(err){
                console.error(err);
                return reject(err);
            }
            if(result.length === 0){
                return reject(new Error("Product not found"));
            }
            resolve(result[0].stock);
        })
    })
}
module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
    getPriceFromProduct,
    checkStock
}