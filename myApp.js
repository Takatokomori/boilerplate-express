require('dotenv').config();
let express = require('express');
let app = express();
let response = process.env.MESSAGE_STYLE;

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

app.use("/public", express.static(__dirname + "/public"));


































module.exports = app;
