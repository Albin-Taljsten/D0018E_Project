const db = require('../db');

function getAllOrders(user_id){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM orders WHERE user_id = ?'
        db.query(sql, [user_id], (err, result) => {
            if (err){
                console.error(err);
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    getAllOrders
}