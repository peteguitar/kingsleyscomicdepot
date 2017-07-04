
// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyparser = require("body-parser");
var morgan = require("morgan");


// Initialize Express
var app = express();

// use morgan for logging
app.use(morgan('dev'));

// use body parser 
app.use(bodyparser.json());
app.use(bodyparser.json({ type: 'application/vnd.api+json' }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.text());

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = process.env.MONGODB_URI || "comicsdb"
var collections = ["comics"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});


// Routes
// 1. going to index.html first
app.get("/", function(req, res) {
  res.sendFile("index.html");
});

// 2. At the "/all" path, display every entry in the animals collection
app.get("/hero/:hero", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything
  db.comics.find({hero: req.params.hero}, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});




// Set the app to listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("App running on port 3000!");
});
