require('dotenv').config();
let bodyParser = require("body-parser");
let express = require('express');
let app = express();
let response = process.env.MESSAGE_STYLE;

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function getIp(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res) {
    if(response == "uppercase"){
      response = response.toUpperCase();
      res.json({"message" : "Hello json".toUpperCase()});
    } else {
      response = response.toLowerCase();
      res.json({"message" : "Hello json"});
    }
});

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({time: req.time});
});

// Get request param
app.get("/:word/echo", (req, res) =>{
  res.json({echo: req.params.word});
});

app.get("/name", function(req, res) {
    var firstName = req.body.first;
    var lastName = req.body.last;
    // OR you can destructure and rename the keys
    var { first: firstName, last: lastName } = req.query;
    // Use template literals to form a formatted string
    res.json({
      name: `${firstName} ${lastName}`
    });
});

app.use("/public", express.static(__dirname + "/public"));


































module.exports = app;
