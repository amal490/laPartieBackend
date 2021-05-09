"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _apolloServer = require("apollo-server");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _product = require("../../../models/product");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var productQuery = {
  Query: {
    getProductById: function () {
      var _getProductById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var productId, schema, validation, product;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                productId = _ref.productId;
                _context.prev = 1;
                schema = _joi["default"].object().keys({
                  productId: _joi["default"].number().id().required()
                });
                validation = schema.validate({
                  productId: productId
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
                return (0, _product.findProductById)(productId);

              case 9:
                product = _context.sent;
                console.log(product);

                if (product) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "id not found on data base "
                });

              case 13:
                return _context.abrupt("return", {
                  product: product
                });

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch productID", _context.t0);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 16]]);
      }));

      function getProductById(_x, _x2) {
        return _getProductById.apply(this, arguments);
      }

      return getProductById;
    }(),
    getProductByCodeprod: function () {
      var _getProductByCodeprod = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref2) {
        var codeProd, schema, validation, product;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                codeProd = _ref2.codeProd;
                _context2.prev = 1;
                schema = _joi["default"].object().keys({
                  codeProd: _joi["default"].string().alphanum().required()
                });
                validation = schema.validate({
                  codeProd: codeProd
                });
                console.log(validation);

                if (!validation.error) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "error on your input values "
                });

              case 7:
                _context2.next = 9;
                return (0, _product.findProductByCode)(codeProd);

              case 9:
                product = _context2.sent;

                if (product) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "codeprod not found on data base "
                });

              case 12:
                return _context2.abrupt("return", {
                  product: product
                });

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch productID", _context2.t0);

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 15]]);
      }));

      function getProductByCodeprod(_x3, _x4) {
        return _getProductByCodeprod.apply(this, arguments);
      }

      return getProductByCodeprod;
    }(),
    getRelatedProducts: function () {
      var _getRelatedProducts2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref3) {
        var productId, schema, validation, product, products;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                productId = _ref3.productId;
                _context3.prev = 1;
                schema = _joi["default"].object().keys({
                  productId: _joi["default"].number().id().required()
                });
                validation = schema.validate({
                  productId: productId
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
                return (0, _product.findProductById)(productId);

              case 9:
                product = _context3.sent;

                if (product) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", {
                  errors: "Product not found on db"
                });

              case 12:
                _context3.next = 14;
                return (0, _product.getRelatedProducts)(product.subCategoryId);

              case 14:
                products = _context3.sent;
                return _context3.abrupt("return", products);

              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch all the Users", {
                  err: _context3.t0
                });

              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 18]]);
      }));

      function getRelatedProducts(_x5, _x6) {
        return _getRelatedProducts2.apply(this, arguments);
      }

      return getRelatedProducts;
    }(),
    getAllProducts: function () {
      var _getAllProducts2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var products;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return (0, _product.getAllProducts)();

              case 3:
                products = _context4.sent;
                return _context4.abrupt("return", products);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                new _apolloServer.ApolloError("Failed to fetch all the Users", {
                  err: _context4.t0
                });

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      function getAllProducts() {
        return _getAllProducts2.apply(this, arguments);
      }

      return getAllProducts;
    }()
  }
};
var _default = productQuery;
exports["default"] = _default;