"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = exports.isStatusActive = exports.isClient = exports.isAdmin = void 0;

var _graphqlShield = require("graphql-shield");

var _apolloServer = require("apollo-server");

var _user = require("../../models/user");

var _client = require(".prisma/client");

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isAdmin = (0, _graphqlShield.rule)({
  cache: "contextual"
})( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, ctx) {
    var userid, user, role;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _objectDestructuringEmpty(_ref);

            _context.prev = 1;
            _context.next = 4;
            return ctx.req.userId;

          case 4:
            userid = _context.sent;
            _context.next = 7;
            return (0, _user.findUserById)(userid);

          case 7:
            user = _context.sent;
            role = user.role;

            if (!(role.role === _client.Role.ADMIN)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", true);

          case 13:
            return _context.abrupt("return", false);

          case 14:
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](1);
            new _apolloServer.ApolloError("Failed to fetch the User", {
              err: _context.t0
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 16]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}());
exports.isAdmin = isAdmin;
var isClient = (0, _graphqlShield.rule)({
  cache: "contextual"
})( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref3, ctx) {
    var userid, user, role;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _objectDestructuringEmpty(_ref3);

            _context2.prev = 1;
            _context2.next = 4;
            return ctx.req.userId;

          case 4:
            userid = _context2.sent;
            _context2.next = 7;
            return (0, _user.findUserById)(userid);

          case 7:
            user = _context2.sent;

            if (user) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", {
              errors: "not authentificated"
            });

          case 10:
            role = user.role;

            if (!(role.role === _client.Role.CLIENT)) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("return", true);

          case 15:
            return _context2.abrupt("return", false);

          case 16:
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](1);
            new _apolloServer.ApolloError("Failed to fetch the User", {
              err: _context2.t0
            });

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 18]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}());
exports.isClient = isClient;
var isStatusActive = (0, _graphqlShield.rule)({
  cache: "contextual"
})( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref5, ctx) {
    var userid, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _objectDestructuringEmpty(_ref5);

            _context3.prev = 1;
            _context3.next = 4;
            return ctx.req.userId;

          case 4:
            userid = _context3.sent;
            _context3.next = 7;
            return (0, _user.findUserById)(userid);

          case 7:
            user = _context3.sent;
            console.log(user);

            if (user) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", {
              errors: "not authentificated"
            });

          case 11:
            if (!(user.status === _client.Status.active)) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("return", true);

          case 15:
            return _context3.abrupt("return", false);

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](1);
            new _apolloServer.ApolloError("Failed to fetch the User", {
              err: _context3.t0
            });

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 18]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}());
exports.isStatusActive = isStatusActive;
var isAuthenticated = (0, _graphqlShield.rule)({
  cache: "contextual"
})( /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref7, ctx) {
    var userid, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _objectDestructuringEmpty(_ref7);

            _context4.prev = 1;
            _context4.next = 4;
            return ctx.req.userId;

          case 4:
            userid = _context4.sent;
            _context4.next = 7;
            return (0, _user.findUserById)(userid);

          case 7:
            user = _context4.sent;

            if (user) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", false);

          case 10:
            return _context4.abrupt("return", true);

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](1);
            new _apolloServer.ApolloError("Failed to fetch the User", {
              err: _context4.t0
            });

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 13]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}());
exports.isAuthenticated = isAuthenticated;