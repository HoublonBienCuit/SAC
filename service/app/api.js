require("dotenv").config();

const express = require('express');
const crypto = require("crypto");
const cors = require("cors");

const apiApp = module.exports = express();
const pool = module.parent.pool;

apiApp.set('trust proxy', 1)
apiApp.use(express.json());
apiApp.use(cors());
/*const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);

var pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "localhost"
});*/
const session = require("express-session");
apiApp.use(session({
  //store: new MySQLStore({}, pool),
  secret: '5a359adf700539658ae9b9817fdd0d58',
  saveUninitialized: true,
  resave: false,
  cookie: {secure: false},
  //name: "api",
  //expires: new Date(Date.now() + (30 * 86400 * 1000))
}));

apiApp.get('/api/ObtenirBois/:id', (req, res) => {
  const query = "SELECT * FROM bois WHERE id=?";
  pool.query(query, [req.params.id], (error, results) => {
    if (results[0]) {
      let s = results[0].nom;
      res.send(s);
    } else {
      res.send("not found");
    }
  });
});

//informations pour l'encryptage du mot de passe
var algorithm = 'aes256'; // algorithm
var key = 'password';

apiApp.post('/api/Connexion', (req, res) => {

  let cipheriv = crypto.createCipher(algorithm, key);  
  let encryptedPassword = cipheriv.update(req.body.motDePasse, 'utf8', 'hex') + cipheriv.final('hex');

  var data = [req.body.courriel, encryptedPassword];

  const query = "SELECT * FROM utilisateurs WHERE courriel=? AND motDePasse=?";
  pool.query(query, data, (error, results) => {
    if (results[0] && !error) {
      req.session.courriel = req.body.courriel;
      req.session.save(() => {
        console.log(req.session);
        res.send(true);
      });
    } else {
      res.send(false);
    }
  });
});

apiApp.post('/api/Inscription', (req, res) => {
  console.log(req.body);
  var cipheriv = crypto.createCipher(algorithm, key);
  var encryptedPassword = cipheriv.update(req.body.motDePasse, 'utf8', 'hex') + cipheriv.final('hex');

  let data = [req.body.courriel, encryptedPassword];

  const query = "INSERT INTO utilisateurs(courriel, motDePasse) VALUES (?, ?);";
  pool.query(query, data, (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Inscription successed !!!!");
    }
  });
});

apiApp.get('/api/ObtenirSession/:nom', (req, res) => {
  console.log(req.session);
  res.send(req.session[req.params.nom]);
});

//module.exports = apiApp;