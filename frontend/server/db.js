const mysql = require("mysql");

const db =  mysql.createConnection({
    connectionLimit: 20, 
    host: 'localhost',
    user: 'root',
    password: 'pass12345678',
    database: 'login_register',
});


db.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

 module.exports = db; 

 