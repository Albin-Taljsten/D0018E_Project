const express = require('express');
const router = express.Router();
const db = require('../db');



router.post('/', (req, res) => {
    const customer = { Name: req.body.name, Email: req.body.email, Password: req.body.password };
    const check_sql = 'SELECT email FROM customers WHERE email = ?'
    db.query(check_sql, [customer.Email], (err, result) => {
        if(err){
            console.error(err);
            return res.status(500).json({message: "server error"})
        }
        if (result.length > 0){
            return res.status(409).json({message: 'Email already exists'})
        }
        const insert_sql = 'INSERT INTO customers (name, email, password) VALUES (?, ?, ?)';

        db.query(insert_sql, [customer.Name, customer.Email, customer.Password], (err, result) => {
            if(err){
                console.error(err);
                return res.status(500).json({message: "server error"})
            }
            res.status(201).json({message: "Customer created",})
        });
    });
});

module.exports = router;