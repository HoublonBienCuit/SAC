require("dotenv").config();

const express = require('express');
const cors = require("cors");
const path = require("path");

const coreApp = module.exports = express();

coreApp.set('trust proxy', 1)
coreApp.use(express.json());
coreApp.use(cors());

//var a = module.parent.session;
///a.name = "core";
//coreApp.use(a);

let dir = path.resolve(__dirname, '..', '..') + '/'
coreApp.use(express.static(dir));

coreApp.get('/connexion', (req, res) => {
    //console.log(req.session);
    res.sendFile(dir + "index.html");
});

coreApp.get('/application', (req, res) => {
    res.sendFile(dir + "application.html");
});

coreApp.get('/:route', (req, res) => {
    res.redirect("/");
});

//module.exports = coreApp;