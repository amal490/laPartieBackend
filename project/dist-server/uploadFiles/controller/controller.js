"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var uploadFile = require("../middeleware/upload");

var fs = require("fs");

require("dotenv").config();

var upload = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return uploadFile(req, res);

          case 3:
            if (!(req.file == undefined)) {
              _context.next = 8;
              break;
            }

            console.log("No file received");
            return _context.abrupt("return", res.send({
              success: false
            }));

          case 8:
            console.log("file received");
            return _context.abrupt("return", res.send({
              success: true
            }));

          case 10:
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).send({
              message: "Could not upload the file"
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function upload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getListFiles = function getListFiles(req, res) {
  var directoryPath = __basedir + process.env.UPLOAD;
  console.log(process.env.UPLOAD);
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!"
      });
    }

    var fileInfos = [];
    files.forEach(function (file) {
      fileInfos.push({
        name: file,
        url: req.baseUrl + file
      });
    });
    res.status(200).send(fileInfos);
  });
};

module.exports = {
  upload: upload,
  getListFiles: getListFiles
};