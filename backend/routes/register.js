const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const { createBasketForUser } = require('../services/basketService');
const { generateToken } = require('../services/authenticationService');


router.post('/', (req, res) => {
    const {Name, Email, Password} = req.body;

    const check_sql = 'SELECT email FROM users WHERE email = ?'

    if (!Name || !Email || !Password) {
        return res.status(400).json({ message: "Name, email and password are required" });
    }

    db.query(check_sql, [Email], async (err, result) => {
        if(err){
            console.error(err);
            return res.status(500).json({message: "server error"})
        }
        if (result.length > 0){
            return res.status(409).json({message: 'Email already exists'})
        }
        try {
            const hashedPassword = await bcrypt.hash(Password, 10);
            const insert_sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

            db.query(insert_sql, [Name, Email, hashedPassword], async (err, result) => {
            if(err){
                console.error(err);
                return res.status(500).json({message: "server error"})
            }

            const userId = result.insertId;

            await createBasketForUser(userId);
            
            const token = generateToken({ id: userId, email: Email });

            res.status(201).json({message: "User created", token});
            });
            
        }catch (err) {
            console.error(err);
            return res.status(500).json({message: "server error"})
        }

    });
});

module.exports = router;