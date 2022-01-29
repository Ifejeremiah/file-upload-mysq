const mysql = require('mysql');

// Create connection
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB
});

// Connect to database
connection.connect((err) => {
  if (err) console.log(err.stack);
  console.log('Connected to database...');
});

module.exports = connection;