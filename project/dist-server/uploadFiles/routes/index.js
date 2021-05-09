"use strict";

var express = require("express");

var router = express.Router();

var controller = require("../controller/controller");

var routes = function routes(app) {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  app.use(router);
};

module.exports = routes;