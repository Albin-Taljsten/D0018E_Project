const db = require('../db');

db.query("SELECT email, password, ID FROM users WHERE email = ?", ['sven@outlook.com'], (err, result) => {
    if(err){
        console.error(err);
    }else {
        console.log(result);    
    }
    process.exit();
});