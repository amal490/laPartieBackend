"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _apolloServer = require("apollo-server");

require("@babel/polyfill");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _random = _interopRequireDefault(require("random"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _user2 = require("../../../models/user");

var _client = require(".prisma/client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userMutations = {
  Mutation: {
    register: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var email, username, name, password, role, schema, data, validation, user, _data, secretCode, hashedpassword, _user;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = _ref.email, username = _ref.username, name = _ref.name, password = _ref.password, role = _ref.role;
                _context.prev = 1;
                schema = _joi["default"].object().keys({
                  email: _joi["default"].string().email(),
                  username: _joi["default"].string().alphanum().min(5).max(20),
                  name: _joi["default"].string().min(3).max(20),
                  password: _joi["default"].string().regex(/^[a-zA-Z0-9]{3,30}$/),
                  role: _joi["default"].string()
                }).required();
                data = {
                  email: email,
                  username: username,
                  name: name,
                  password: password,
                  role: role
                };
                validation = schema.validate(data);
                console.log(validation);

                if (!validation.error) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "error on your input values "
                });

              case 8:
                _context.next = 10;
                return (0, _user2.findUserByEmailAndUsername)(username, email);

              case 10:
                user = _context.sent;

                if (!(user.length >= 1)) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "Failed to Register the User by the same email"
                });

              case 13:
                if (!(user.length == 0)) {
                  _context.next = 30;
                  break;
                }

                _context.next = 16;
                return (0, _user2.findIdRoleByName)(role);

              case 16:
                _data = _context.sent;
                secretCode = _random["default"]["int"](1000, 5999);
                _context.next = 20;
                return (0, _user2.sendVerficationCode)(email, secretCode);

              case 20:
                _context.next = 22;
                return _bcryptjs["default"].hash(password, 10);

              case 22:
                hashedpassword = _context.sent;
                _context.next = 25;
                return (0, _user2.createUserData)(name, username, email, hashedpassword, _data.roleId, secretCode);

              case 25:
                _user = _context.sent;
                console.log(_user);

                if (_user) {
                  _context.next = 29;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "Error on registration"
                });

              case 29:
                return _context.abrupt("return", {
                  user: _user
                });

              case 30:
                _context.next = 35;
                break;

              case 32:
                _context.prev = 32;
                _context.t0 = _context["catch"](1);
                new _apolloServer.ApolloError("Failed to Register the User");

              case 35:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 32]]);
      }));

      function register(_x, _x2) {
        return _register.apply(this, arguments);
      }

      return register;
    }(),
    verifyMailForRegister: function () {
      var _verifyMailForRegister = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref2, ctx) {
        var userId, code, schema, validation, user, secretCode, verification, accessToken;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userId = _ref2.userId, code = _ref2.code;
                _context2.prev = 1;
                schema = _joi["default"].object().keys({
                  userId: _joi["default"].number().id(),
                  code: _joi["default"].number()
                }).required();
                validation = schema.validate({
                  userId: userId,
                  code: code
                });

                if (!validation.error) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "error on your input values "
                });

              case 6:
                _context2.next = 8;
                return (0, _user2.findUserById)(userId);

              case 8:
                user = _context2.sent;
                console.log(user);

                if (user) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "Can't Find User"
                });

              case 12:
                secretCode = user.code;
                verification = (0, _user2.isCodeCorrect)(secretCode, code);

                if (verification) {
                  _context2.next = 18;
                  break;
                }

                _context2.next = 17;
                return (0, _user2.updateStatus)(user.userId, _client.Status.notActive);

              case 17:
                return _context2.abrupt("return", {
                  errors: "Code Incorrecte "
                });

              case 18:
                _context2.next = 20;
                return (0, _user2.updateStatus)(user.userId, _client.Status.active);

              case 20:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 25;
                  break;
                }

                accessToken = _jsonwebtoken["default"].sign({
                  userId: user.userId
                }, "token", {
                  expiresIn: "7d"
                });
                ctx.res.cookie("accessToken", accessToken);
                return _context2.abrupt("return", {
                  user: user
                });

              case 25:
                _context2.next = 30;
                break;

              case 27:
                _context2.prev = 27;
                _context2.t0 = _context2["catch"](1);
                new _apolloServer.ApolloError("Failed to Register the User");

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 27]]);
      }));

      function verifyMailForRegister(_x3, _x4, _x5) {
        return _verifyMailForRegister.apply(this, arguments);
      }

      return verifyMailForRegister;
    }(),
    resetPassword: function () {
      var _resetPassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref3) {
        var email, schema, validation, user, secretCode;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                email = _ref3.email;
                _context3.prev = 1;
                schema = _joi["default"].object().keys({
                  email: _joi["default"].string().email().required()
                });
                validation = schema.validate(email);
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
                return (0, _user2.findUserByEmail)(email);

              case 9:
                user = _context3.sent;

                if (user) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", {
                  errors: "Can't find User"
                });

              case 12:
                secretCode = _random["default"]["int"](0, 5999);
                _context3.next = 15;
                return (0, _user2.updateVerificationCode)(user.userId, secretCode);

              case 15:
                user = _context3.sent;

                if (!user) {
                  _context3.next = 19;
                  break;
                }

                _context3.next = 19;
                return (0, _user2.sendVerficationCode)(email, secretCode);

              case 19:
                return _context3.abrupt("return", {
                  user: user
                });

              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](1);
                new _apolloServer.ApolloError("Failed to Register the User");

              case 25:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 22]]);
      }));

      function resetPassword(_x6, _x7) {
        return _resetPassword.apply(this, arguments);
      }

      return resetPassword;
    }(),
    verifyMailForRestPassword: function () {
      var _verifyMailForRestPassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref4) {
        var userId, code, password, schema, validation, user, secretCode, verification, hashedpassword;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userId = _ref4.userId, code = _ref4.code, password = _ref4.password;
                _context4.prev = 1;
                schema = _joi["default"].object().keys({
                  userId: _joi["default"].number().id(),
                  code: _joi["default"].number(),
                  password: _joi["default"].string().regex(/^[a-zA-Z0-9]{3,30}$/)
                }).required();
                validation = schema.validate({
                  userId: userId,
                  code: code,
                  password: password
                });
                console.log(validation);

                if (!validation.error) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", {
                  errors: "error on password"
                });

              case 7:
                _context4.next = 9;
                return (0, _user2.findUserById)(userId);

              case 9:
                user = _context4.sent;
                console.log(user);

                if (user) {
                  _context4.next = 13;
                  break;
                }

                return _context4.abrupt("return", {
                  errors: "Can't Find User"
                });

              case 13:
                secretCode = user.code;
                verification = (0, _user2.isCodeCorrect)(secretCode, code);
                console.log(verification);

                if (verification) {
                  _context4.next = 18;
                  break;
                }

                return _context4.abrupt("return", {
                  errors: "Code Incorrecte "
                });

              case 18:
                _context4.next = 20;
                return _bcryptjs["default"].hash(password, 10);

              case 20:
                hashedpassword = _context4.sent;
                _context4.next = 23;
                return (0, _user2.updateUserPassword)(user.userId, hashedpassword);

              case 23:
                user = _context4.sent;
                return _context4.abrupt("return", {
                  user: user
                });

              case 27:
                _context4.prev = 27;
                _context4.t0 = _context4["catch"](1);
                new _apolloServer.ApolloError("Failed to Register the User");

              case 30:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 27]]);
      }));

      function verifyMailForRestPassword(_x8, _x9) {
        return _verifyMailForRestPassword.apply(this, arguments);
      }

      return verifyMailForRestPassword;
    }(),
    deleteUserById: function () {
      var _deleteUserById2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref5) {
        var userId, schema, validation, isExist, user;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                userId = _ref5.userId;
                _context5.prev = 1;
                schema = _joi["default"].object().keys({
                  userId: _joi["default"].number().id().required()
                });
                validation = schema.validate(userId);
                console.log(validation);

                if (!validation.error) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", {
                  errors: "error on password"
                });

              case 7:
                _context5.next = 9;
                return (0, _user2.findUserById)(userId);

              case 9:
                isExist = _context5.sent;

                if (isExist) {
                  _context5.next = 12;
                  break;
                }

                return _context5.abrupt("return", {
                  errors: "can't find user !"
                });

              case 12:
                _context5.next = 14;
                return (0, _user2.deleteUserById)(userId);

              case 14:
                user = _context5.sent;
                return _context5.abrupt("return", {
                  user: user
                });

              case 18:
                _context5.prev = 18;
                _context5.t0 = _context5["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch username", _context5.t0);

              case 21:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 18]]);
      }));

      function deleteUserById(_x10, _x11) {
        return _deleteUserById2.apply(this, arguments);
      }

      return deleteUserById;
    }()
  }
};
var _default = userMutations;
exports["default"] = _default;