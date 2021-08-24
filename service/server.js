require("dotenv").config();

const express = require('express');
const mysql = require("mysql");
const app = express();

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: "localhost"
});

app.get('/:bois', (req, res) => {
  const query = "SELECT * FROM users WHERE ";
  pool.query(query, [req.params.bois], (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
    
  })
});