const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', //root pw
    database: 'skistore'
});

db.connect(err => {
    if (err) console.error('Database connecntion failed: ', err);
    else console.log('Connected to MySQL database')
});

module.exports = db;