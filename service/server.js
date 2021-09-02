require("dotenv").config();

const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);

var pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "localhost"
});
module.pool = pool;

module.session = session({
    //store: new MySQLStore({}, pool),
    secret: '5a359adf700539658ae9b9817fdd0d58',
    saveUninitialized: true,
    resave: false,
    cookie: {secure: false},
    //name: "api",
    //expires: new Date(Date.now() + (30 * 86400 * 1000))
});

const apiApp = require('./app/api.js');
const coreApp = require('./app/core.js');

apiApp.listen(process.env.API_PORT, () => {
    console.log("Démarrage de l'API...");
});;

coreApp.listen(process.env.CORE_PORT, () => {
    console.log("Démarrage du serveur...");
});;