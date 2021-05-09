"use strict";

var cors = require("cors");

var express = require("express");

var app = express();

require("dotenv").config();

global.__basedir = __dirname;
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

var initRoutes = require("./routes");

app.use(express.urlencoded({
  extended: true
}));
initRoutes(app);
var port = process.env.PORT_UPLOAD;
app.listen(port, function () {
  console.log("Running at localhost:".concat(port));
});