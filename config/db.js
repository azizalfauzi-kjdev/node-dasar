const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Default XAMPP
  database: 'node_dasar',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Gunakan promise agar bisa menggunakan async/await di controller
module.exports = pool.promise();