"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("../routes/index"));

var _users = _interopRequireDefault(require("../routes/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// app.js
var _require = require("jsonwebtoken"),
    verify = _require.verify;

var app = (0, _express["default"])();
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../public")));
app.use("/", _index["default"]);
app.use("/users", _users["default"]); //app.use(express.static(__dirname + "/staticFiles"));

app.use(function (req, res, next) {
  var accessToken = req.cookies["accessToken"];

  try {
    req.userId = null;

    if (accessToken) {
      //  console.log("accessToken", accessToken);
      var data = verify(accessToken, "token");

      if (data && data.userId) {
        req.userId = data.userId;
      }

      console.log("req", req.userId);
    }
  } catch (_unused) {
    new Error("Error");
  }

  next();
});
var _default = app;
exports["default"] = _default;