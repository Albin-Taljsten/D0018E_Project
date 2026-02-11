const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../services/authenticationService');


router.post('/', (req, res) => {
    const { Email, Password } = req.body;
    if(!Email || !Password) {
        return res.status(400).json({message: "Email and password are required"});
    }
    const check_sql = 'SELECT email, password, user_id, role FROM users WHERE email = ?'
    db.query(check_sql, [Email], async (err, result) => {
        if(err){
            console.error(err);
            return res.status(500).json({message: "server error"})
        }
        if (result.length === 0){
            return res.status(404).json({message: 'Email does not exist'})
        }       
        const hashedPassword = result[0].password;
        const token = generateToken({id: result[0].user_id, email: Email });
        
        if(await bcrypt.compare(Password, hashedPassword)){
            if(result[0].role === 'admin'){
                return res.status(200).json({message: "Admin login successful", token, role: 'admin'});
            }else{
                return res.status(200).json({message: "User login successful", token, role: 'user'});
            }
        }else{
            return res.status(401).json({message: "Invalid password"});
        }       
    });
});

module.exports = router;