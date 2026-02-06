const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');


router.post('/', (req, res) => {
    const { Email, Password } = req.body;
    if(!Email || !Password) {
        return res.status(400).json({message: "Email and password are required"});
    }
    const check_sql = 'SELECT email, password FROM users WHERE email = ?'
    db.query(check_sql, [Email], async (err, result) => {
        if(err){
            console.error(err);
            return res.status(500).json({message: "server error"})
        }
        if (result.length === 0){
            return res.status(404).json({message: 'Email does not exist'})
        }       
        const hashedPassword = result[0].password;
        if(await bcrypt.compare(Password, hashedPassword)){
            return res.status(200).json({message: "Login successful"});
        }else{
            return res.status(401).json({message: "Invalid password"});
        }       
    });
});

module.exports = router;