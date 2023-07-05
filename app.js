require("dotenv").config();

const express = require("express")
const mongoose = require("mongoose");
const path = require('path');
const app = express();

mongoose.connect( process.env.MONGO_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')
);

app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    // Intercepts OPTIONS method
    if (req.method === "OPTIONS") {
      // Respond with 200
      res.sendStatus(200);
    } else {
      next();
    }
  });

const api = require("./api/api");
app.use("/api", api);
app.use("/images", express.static(path.join(__dirname, 'images')));

module.exports = app;