"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _apolloServer = require("apollo-server");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("@babel/polyfill");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _user = require("../../../models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userQueries = {
  Query: {
    getUserByEmail: function () {
      var _getUserByEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var email, schema, validation, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = _ref.email;
                _context.prev = 1;
                schema = _joi["default"].object().keys({
                  email: _joi["default"].string().email().required()
                });
                validation = schema.validate({
                  email: email
                });
                console.log(validation);

                if (!validation.error) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "error on your input values "
                });

              case 7:
                _context.next = 9;
                return (0, _user.findUserByEmail)(email);

              case 9:
                user = _context.sent;

                if (user) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "username not found on data base "
                });

              case 12:
                return _context.abrupt("return", {
                  user: user
                });

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch username", _context.t0);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 15]]);
      }));

      function getUserByEmail(_x, _x2) {
        return _getUserByEmail.apply(this, arguments);
      }

      return getUserByEmail;
    }(),
    getAllUsers: function () {
      var _getAllUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var users;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return (0, _user.findAllUsers)();

              case 3:
                users = _context2.sent;
                return _context2.abrupt("return", users);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                new _apolloServer.ApolloError("Failed to fetch all the Users", {
                  err: _context2.t0
                });

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function getAllUsers() {
        return _getAllUsers.apply(this, arguments);
      }

      return getAllUsers;
    }(),
    getUserByID: function () {
      var _getUserByID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref2) {
        var id, schema, validation, user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref2.id;
                _context3.prev = 1;
                schema = _joi["default"].object().keys({
                  id: _joi["default"].number().required()
                });
                validation = schema.validate({
                  id: id
                });
                console.log(validation);

                if (!validation.error) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", {
                  errors: "error on your input values "
                });

              case 7:
                _context3.next = 9;
                return (0, _user.findUserById)(id);

              case 9:
                user = _context3.sent;

                if (user) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", {
                  errors: "id not found on data base "
                });

              case 12:
                console.log(user);
                return _context3.abrupt("return", {
                  user: user
                });

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch userID", _context3.t0);

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 16]]);
      }));

      function getUserByID(_x3, _x4) {
        return _getUserByID.apply(this, arguments);
      }

      return getUserByID;
    }(),
    login: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref3, ctx) {
        var email, password, schema, validation, user, compare, accessToken;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                email = _ref3.email, password = _ref3.password;
                _context4.prev = 1;
                schema = _joi["default"].object().keys({
                  email: _joi["default"].string().email(),
                  password: _joi["default"].string().regex(/^[a-zA-Z0-9]{3,30}$/)
                }).required();
                validation = schema.validate({
                  email: email,
                  password: password
                });
                console.log(validation);

                if (!validation.error) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", {
                  errors: "error on your input values "
                });

              case 7:
                _context4.next = 9;
                return (0, _user.findUserByEmail)(email);

              case 9:
                user = _context4.sent;

                if (user) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt("return", {
                  errors: "User not found"
                });

              case 12:
                _context4.next = 14;
                return _bcryptjs["default"].compare(password, user.password);

              case 14:
                compare = _context4.sent;

                if (compare) {
                  _context4.next = 17;
                  break;
                }

                return _context4.abrupt("return", {
                  errors: "User not found"
                });

              case 17:
                accessToken = _jsonwebtoken["default"].sign({
                  userId: user.userId
                }, "token", {
                  expiresIn: "7d"
                });
                ctx.res.cookie("accessToken", accessToken);
                return _context4.abrupt("return", {
                  user: user
                });

              case 22:
                _context4.prev = 22;
                _context4.t0 = _context4["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch userID", _context4.t0);

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 22]]);
      }));

      function login(_x5, _x6, _x7) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),
    logout: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref4, ctx) {
        var userid, user;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _objectDestructuringEmpty(_ref4);

                _context5.prev = 1;
                userid = ctx.req.userId;

                if (userid) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return", {
                  errors: "not authenticated"
                });

              case 5:
                _context5.next = 7;
                return (0, _user.findUserById)(userid);

              case 7:
                user = _context5.sent;
                ctx.res.clearCookie("accessToken");
                return _context5.abrupt("return", {
                  user: user
                });

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](1);
                return _context5.abrupt("return", {
                  errors: _context5.t0
                });

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 12]]);
      }));

      function logout(_x8, _x9, _x10) {
        return _logout.apply(this, arguments);
      }

      return logout;
    }(),
    me: function () {
      var _me = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref5, ctx) {
        var userid, user;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _objectDestructuringEmpty(_ref5);

                console.log(ctx.req.userId);
                _context6.prev = 2;
                userid = ctx.req.userId;

                if (userid) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", {
                  errors: "not authenticated"
                });

              case 6:
                _context6.next = 8;
                return (0, _user.findUserById)(userid);

              case 8:
                user = _context6.sent;
                return _context6.abrupt("return", {
                  user: user
                });

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](2);
                return _context6.abrupt("return", {
                  errors: _context6.t0
                });

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 12]]);
      }));

      function me(_x11, _x12, _x13) {
        return _me.apply(this, arguments);
      }

      return me;
    }()
  }
};
var _default = userQueries;
exports["default"] = _default;