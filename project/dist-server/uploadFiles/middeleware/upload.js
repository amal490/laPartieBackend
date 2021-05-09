"use strict";

var util = require("util");

var multer = require("multer");

var uuid4 = require("uuid").v4;

var path = require("path");

require("dotenv").config(); //const maxSize = 2 * 1024 * 1024;


var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, __basedir + process.env.UPLOAD);
  },
  filename: function filename(req, file, cb) {
    var fullName = uuid4().replace(/-/g, "") + path.extname(file.originalname);
    cb(null, fullName);
  }
});
var uploadFile = multer({
  storage: storage //limits: { fileSize: maxSize },

}).single("file");
var uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;