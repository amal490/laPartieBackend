"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _apolloServer = require("apollo-server");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _user = require("../../../models/user");

var _product = require("../../../models/product");

var _cart = require("../../../models/cart");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//import { Validate } from ".prisma/client";
var cartMutations = {
  Mutation: {
    addToCart: function () {
      var _addToCart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var userId, productId, quantity, schema, validation, user, product, cart;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = _ref.userId, productId = _ref.productId, quantity = _ref.quantity;
                _context.prev = 1;
                schema = _joi["default"].object().keys({
                  userId: _joi["default"].number().id(),
                  productId: _joi["default"].number().id(),
                  quantity: _joi["default"].number().greater(0)
                }).required();
                validation = schema.validate({
                  userId: userId,
                  productId: productId,
                  quantity: quantity
                });

                if (!validation.error) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "error on your input values "
                });

              case 6:
                console.log(validation);
                _context.next = 9;
                return (0, _user.findUserById)(userId);

              case 9:
                user = _context.sent;

                if (user) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "don't found user"
                });

              case 12:
                console.log(user);
                _context.next = 15;
                return (0, _product.findProductById)(productId);

              case 15:
                product = _context.sent;

                if (product) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "don't found Product"
                });

              case 18:
                console.log(product);
                _context.next = 21;
                return (0, _cart.findProductFromCart)(userId, productId);

              case 21:
                cart = _context.sent;

                if (!cart) {
                  _context.next = 24;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "Product exist on card"
                });

              case 24:
                if (!(product.quantity < quantity)) {
                  _context.next = 26;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "Product quantity not disponible"
                });

              case 26:
                cart = (0, _cart.addProductAtCart)(userId, productId, quantity);

                if (cart) {
                  _context.next = 29;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "Can't create cart"
                });

              case 29:
                console.log(cart);
                return _context.abrupt("return", {
                  cart: cart
                });

              case 33:
                _context.prev = 33;
                _context.t0 = _context["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch product", _context.t0);

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 33]]);
      }));

      function addToCart(_x, _x2) {
        return _addToCart.apply(this, arguments);
      }

      return addToCart;
    }(),
    removeProductFromCart: function () {
      var _removeProductFromCart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref2) {
        var userId, productId, schema, validation, cart;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userId = _ref2.userId, productId = _ref2.productId;
                _context2.prev = 1;
                schema = _joi["default"].object().keys({
                  userId: _joi["default"].number().id(),
                  productId: _joi["default"].number().id()
                }).required();
                validation = schema.validate({
                  userId: userId,
                  productId: productId
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
                return (0, _cart.findProductFromCart)(userId, productId);

              case 9:
                cart = _context2.sent;

                if (cart) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "Can't Find User or Product"
                });

              case 12:
                _context2.next = 14;
                return (0, _cart.deleteProductFromCart)(cart.cartId);

              case 14:
                cart = _context2.sent;

                if (cart) {
                  _context2.next = 17;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "Can't delete cart"
                });

              case 17:
                console.log(cart);
                return _context2.abrupt("return", {
                  cart: cart
                });

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch product", _context2.t0);

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 21]]);
      }));

      function removeProductFromCart(_x3, _x4) {
        return _removeProductFromCart.apply(this, arguments);
      }

      return removeProductFromCart;
    }(),
    removeCart: function () {
      var _removeCart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref3) {
        var userId, schema, validation, user, cart, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userId = _ref3.userId;
                _context3.prev = 1;
                schema = _joi["default"].object().keys({
                  userId: _joi["default"].number().id().required()
                });
                validation = schema.validate({
                  userId: userId
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
                return (0, _user.findUserById)(userId);

              case 9:
                user = _context3.sent;

                if (user) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", new Error("Can't Find User "));

              case 12:
                _context3.next = 14;
                return (0, _cart.findUserCart)(userId);

              case 14:
                cart = _context3.sent;

                if (!(cart.length == 0)) {
                  _context3.next = 17;
                  break;
                }

                return _context3.abrupt("return", new Error(" Can't find Cart"));

              case 17:
                _context3.next = 19;
                return (0, _cart.deleteCartUser)(userId);

              case 19:
                data = _context3.sent;

                if (data) {
                  _context3.next = 22;
                  break;
                }

                return _context3.abrupt("return", new Error("Can't  delete Cart"));

              case 22:
                return _context3.abrupt("return", cart);

              case 25:
                _context3.prev = 25;
                _context3.t0 = _context3["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch cart", _context3.t0);

              case 28:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 25]]);
      }));

      function removeCart(_x5, _x6) {
        return _removeCart.apply(this, arguments);
      }

      return removeCart;
    }(),
    updateProductQuantityfromCart: function () {
      var _updateProductQuantityfromCart2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref4) {
        var userId, productId, quantity, schema, validation, cart, productQuantity;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userId = _ref4.userId, productId = _ref4.productId, quantity = _ref4.quantity;
                _context4.prev = 1;
                schema = _joi["default"].object().keys({
                  userId: _joi["default"].number().id(),
                  productId: _joi["default"].number().id(),
                  quantity: _joi["default"].number().min(1)
                }).required();
                validation = schema.validate({
                  userId: userId,
                  productId: productId,
                  quantity: quantity
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
                return (0, _cart.findProductFromCart)(userId, productId);

              case 9:
                cart = _context4.sent;
                console.log(cart);

                if (cart) {
                  _context4.next = 13;
                  break;
                }

                return _context4.abrupt("return", {
                  errors: "Can't Find this Product on user cart"
                });

              case 13:
                productQuantity = cart.product.quantity;

                if (!(quantity > productQuantity)) {
                  _context4.next = 16;
                  break;
                }

                return _context4.abrupt("return", {
                  errors: "Product quantity not disponible"
                });

              case 16:
                _context4.next = 18;
                return (0, _cart.updateProductQuantityfromCart)(cart.cartId, quantity);

              case 18:
                cart = _context4.sent;
                console.log(cart);

                if (cart) {
                  _context4.next = 22;
                  break;
                }

                return _context4.abrupt("return", {
                  errors: "Error on update cart "
                });

              case 22:
                return _context4.abrupt("return", {
                  cart: cart
                });

              case 25:
                _context4.prev = 25;
                _context4.t0 = _context4["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch cart", _context4.t0);

              case 28:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 25]]);
      }));

      function updateProductQuantityfromCart(_x7, _x8) {
        return _updateProductQuantityfromCart2.apply(this, arguments);
      }

      return updateProductQuantityfromCart;
    }()
    /*  validCart: async (_, { userId }) => {
      try {
        const schema = joi
          .object()
          .keys({ userId: joi.number().id().required() });
          const validation = schema.validate({ userId });
        console.log(validation);
        var cart = await findUserCart(userId);
        if (cart.length == 0) {
          return new Error("Can't find cart");
        }
        var count = 0;
        cart.forEach(async (element) => {
          if (element.validate == Validate.VALID) {
            count++;
          }
          return count;
        });
        console.log("count " + count);
        if (count > 0) {
          return new Error("Cart is already validate");
        }
        console.log(cart);
        cart.forEach(async (element) => {
          console.log(element.productId);
          let productQuantity = element.product.quantity;
          let quantity = element.quantity;
          let newquantity = productQuantity - quantity;
          if (newquantity < 0) {
            return new Error("Quantity can't be less then 0 ");
          }
          await UpdateQuantityProduct(element.productId, newquantity);
        });
        var cart = await updateSatatusCart(userId);
        if (!cart) {
          throw new Error("Error on update cart");
        }
        const cartUser = await findUserCart(userId);
        if (!cartUser) {
          throw new Error("Error on Find cart");
        }
        console.log(cartUser);
        return cartUser;
      } catch (err) {
        new ApolloError("Failed to fetch product", err);
      }
    },*/

  }
};
var _default = cartMutations;
exports["default"] = _default;