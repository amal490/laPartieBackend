"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _apolloServer = require("apollo-server");

var _category = require("../../../models/category");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var categorieQuery = {
  Query: {
    getCategoryById: function () {
      var _getCategoryById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var categoryId, schema, validation, category;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                categoryId = _ref.categoryId;
                _context.prev = 1;
                schema = _joi["default"].object().keys({
                  categoryId: _joi["default"].number().id().required()
                });
                validation = schema.validate({
                  categoryId: categoryId
                });
                console.log(validation);

                if (!validation.error) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "error on input "
                });

              case 7:
                _context.next = 9;
                return (0, _category.findCategoryById)(categoryId);

              case 9:
                category = _context.sent;
                console.log(category);

                if (category) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "categorie not found on data base "
                });

              case 13:
                return _context.abrupt("return", {
                  category: category
                });

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch categorieID", _context.t0);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 16]]);
      }));

      function getCategoryById(_x, _x2) {
        return _getCategoryById.apply(this, arguments);
      }

      return getCategoryById;
    }(),
    getCategoryByName: function () {
      var _getCategoryByName = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref2) {
        var name, schema, validation, category;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                name = _ref2.name;
                _context2.prev = 1;
                schema = _joi["default"].object().keys({
                  name: _joi["default"].string().min(4).max(50).regex(/^[a-zA-Z]+[ a-zA-Z]*$/)
                });
                validation = schema.validate({
                  name: name
                });
                console.log(validation);

                if (!validation.error) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "error on input "
                });

              case 7:
                _context2.next = 9;
                return (0, _category.findCategoryByName)(name);

              case 9:
                category = _context2.sent;

                if (category) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "category not found on data base "
                });

              case 12:
                return _context2.abrupt("return", {
                  category: category
                });

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch categoryName", _context2.t0);

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 15]]);
      }));

      function getCategoryByName(_x3, _x4) {
        return _getCategoryByName.apply(this, arguments);
      }

      return getCategoryByName;
    }(),
    getAllCategories: function () {
      var _getAllCategories2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var category;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return (0, _category.getAllCategories)();

              case 3:
                category = _context3.sent;
                return _context3.abrupt("return", category);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                new _apolloServer.ApolloError("Failed to fetch all the Users", {
                  err: _context3.t0
                });

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function getAllCategories() {
        return _getAllCategories2.apply(this, arguments);
      }

      return getAllCategories;
    }()
  }
};
var _default = categorieQuery;
exports["default"] = _default;