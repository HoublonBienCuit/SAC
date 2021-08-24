require("dotenv").config();

const express = require('express');
const app = express();

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORTTEST_T || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});