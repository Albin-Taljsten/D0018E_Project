const db = require('../db');

function createFavoritesForUser(user_id) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO favorites (user_id) VALUES (?)';
        db.query(sql, [user_id], (err, result) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

function addToFavorites(user_id, product_id) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO favorite_item (favorites_favorites_id, product_id) 
            VALUES ((SELECT favorites_id FROM favorites WHERE user_id = ?), ?) 
            ON DUPLICATE KEY UPDATE product_id = product_id`;
        db.query(sql, [user_id, product_id], (err, result) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

function removeFromFavorites(user_id, product_id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM favorite_item 
                    WHERE favorites_favorites_id = (
                    SELECT favorites_id FROM favorites WHERE user_id = ?) 
                    AND product_id = ?`;
        db.query(sql, [user_id, product_id], (err, result) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(result);
        });
    });
}


module.exports = {
    createFavoritesForUser,
    addToFavorites,
    removeFromFavorites
};