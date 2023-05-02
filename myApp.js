require('dotenv').config();
let express = require('express');
let app = express();
let response = process.env.MESSAGE_STYLE;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(function getIp(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
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
    var firstName = req.query.first;
    var lastName = req.query.last;
    // OR you can destructure and rename the keys
    var { first: firstName, last: lastName } = req.query;
    // Use template literals to form a formatted string
    res.json({
      name: `${firstName} ${lastName}`
    });
});

app.use("/public", express.static(__dirname + "/public"));


































module.exports = app;
