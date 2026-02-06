const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');


router.post('/', (req, res) => {
    const {Name, Email, Password} = req.body;
    const customer = {Name, Email, Password};
    const check_sql = 'SELECT email FROM users WHERE email = ?'
    if (!customer.Name || !customer.Email || !customer.Password) {
        return res.status(400).json({ message: "Name, email and password are required" });
    }
    db.query(check_sql, [customer.Email], async (err, result) => {
        if(err){
            console.error(err);
            return res.status(500).json({message: "server error"})
        }
        if (result.length > 0){
            return res.status(409).json({message: 'Email already exists'})
        }
        try {
            const hashedPassword = await bcrypt.hash(customer.Password, 10);
            const insert_sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(insert_sql, [customer.Name, customer.Email, hashedPassword], (err, result) => {
            if(err){
                console.error(err);
                return res.status(500).json({message: "server error"})
            }
            res.status(201).json({message: "User created",})
            });
        }catch (err) {
            console.error(err);
            return res.status(500).json({message: "server error"})
        }
    });
});

module.exports = router;