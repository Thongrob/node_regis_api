// get the client
const mysql = require('mysql2');

// create the connection to database
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users_db',
  port: '3307'
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySql');
});

module.exports = conn;