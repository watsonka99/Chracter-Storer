const express = require("express"),
    app = express(),
    dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
const mongoose = require("mongoose"),
    passport = require('passport');
const ejs = require("ejs");

// ROUTES
const playersRoutes = require('./routes/players.js')
const charactersRoutes = require('./routes/characters.js')

dotenv.config();

app.set("view engine", "ejs");

app.use(express.json({  extended: true }));
app.use(express.urlencoded({  extended: true }));

app.get("/", function(req, res){
    res.render("index");
});

const port = process.env.PORT;

app.listen(port, function () {
    console.log("Server Has Started!");
});

// Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

app.use(playersRoutes);
app.use(charactersRoutes);

mongoose.connect(`mongodb+srv://Smol_ne:${process.env.PASSWORD}@character-storer.mu7uq7d.mongodb.net/?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
