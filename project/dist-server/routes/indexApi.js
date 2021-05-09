"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controller = require("../uploadFiles/controller/controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var routes = function routes(appApi) {
  router.post("/upload", _controller.upload);
  router.get("/files", _controller.getListFiles);
  router.get("/files/:name", _controller.download);
  app.use(appApi);
};

var _default = routes;
exports["default"] = _default;