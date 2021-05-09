"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServer = require("apollo-server");

require("@babel/polyfill");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _cart = require("../../../models/cart");

var _user = require("../../../models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cartQueries = {
  Query: {
    findUserCart: function () {
      var _findUserCart2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var userId, schema, validation, user, cart;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = _ref.userId;
                _context.prev = 1;
                schema = _joi["default"].object().keys({
                  userId: _joi["default"].number().id().required()
                });
                validation = schema.validate({
                  userId: userId
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
                return (0, _user.findUserById)(userId);

              case 9:
                user = _context.sent;

                if (user) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", new Error("Can't find user"));

              case 12:
                console.log(user);
                _context.next = 15;
                return (0, _cart.findUserCart)(userId);

              case 15:
                cart = _context.sent;
                console.log(cart);

                if (cart) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("return", new Error("Can't  found user car"));

              case 19:
                return _context.abrupt("return", cart);

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch product", _context.t0);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 22]]);
      }));

      function findUserCart(_x, _x2) {
        return _findUserCart2.apply(this, arguments);
      }

      return findUserCart;
    }()
  }
};
var _default = cartQueries;
exports["default"] = _default;