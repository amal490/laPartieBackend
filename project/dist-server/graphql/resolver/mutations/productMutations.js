"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _apolloServer = require("apollo-server");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _product = require("../../../models/product");

var _subCategory = require("../../../models/subCategory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var productMutations = {
  Mutation: {
    addProduct: function () {
      var _addProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var name, price, rating, description, codeProd, quantity, subCategoryName, defaultImage, images, schema, data, validation, isCodeProdExist, subCategory, product;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = _ref.name, price = _ref.price, rating = _ref.rating, description = _ref.description, codeProd = _ref.codeProd, quantity = _ref.quantity, subCategoryName = _ref.subCategoryName, defaultImage = _ref.defaultImage, images = _ref.images;
                _context.prev = 1;
                schema = _joi["default"].object().keys({
                  name: _joi["default"].string().alphanum().min(3).max(70),
                  price: _joi["default"].number(),
                  rating: _joi["default"].number().min(1).max(5),
                  description: _joi["default"].string(),
                  codeProd: _joi["default"].string(),
                  quantity: _joi["default"].number(),
                  subCategoryName: _joi["default"].string().min(4).max(50),
                  defaultImage: _joi["default"].string(),
                  images: _joi["default"].array()
                }).required();
                data = {
                  name: name,
                  price: price,
                  rating: rating,
                  codeProd: codeProd,
                  description: description,
                  quantity: quantity,
                  subCategoryName: subCategoryName,
                  defaultImage: defaultImage,
                  images: images
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
                return (0, _product.findProductByCode)(codeProd);

              case 10:
                isCodeProdExist = _context.sent;

                if (!isCodeProdExist) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "Failed to add product by the same code "
                });

              case 13:
                _context.next = 15;
                return (0, _subCategory.findSubCategoryByName)(subCategoryName);

              case 15:
                subCategory = _context.sent;

                if (subCategory) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "sub category  not found ! "
                });

              case 18:
                _context.next = 20;
                return (0, _product.createProduct)(name, price, rating, description, codeProd, quantity, subCategory.subCategoryId, defaultImage);

              case 20:
                product = _context.sent;
                images.forEach(function (element) {
                  (0, _product.createImage)(element, product.productId);
                });
                return _context.abrupt("return", {
                  product: product
                });

              case 25:
                _context.prev = 25;
                _context.t0 = _context["catch"](1);
                new _apolloServer.ApolloError("Failed to add Product");

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 25]]);
      }));

      function addProduct(_x, _x2) {
        return _addProduct.apply(this, arguments);
      }

      return addProduct;
    }(),
    deleteProductByID: function () {
      var _deleteProductByID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref2) {
        var productId, schema, validation, isExist, transaction, product;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                productId = _ref2.productId;
                _context2.prev = 1;
                schema = _joi["default"].object().keys({
                  productId: _joi["default"].number().id().required()
                });
                validation = schema.validate({
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
                return (0, _product.findProductById)(productId);

              case 9:
                isExist = _context2.sent;

                if (isExist) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "can't find product !"
                });

              case 12:
                _context2.t0 = _product.deleteAllProductImages;
                _context2.next = 15;
                return (0, _product.deleteProductDefaultImage)(productId);

              case 15:
                _context2.t1 = _context2.sent;
                _context2.next = 18;
                return (0, _product.deleteProductImages)(productId);

              case 18:
                _context2.t2 = _context2.sent;
                _context2.t3 = [_context2.t1, _context2.t2];
                transaction = (0, _context2.t0)(_context2.t3);

                if (transaction) {
                  _context2.next = 23;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "Error on delete product"
                });

              case 23:
                _context2.next = 25;
                return (0, _product.deleteProductById)(productId);

              case 25:
                product = _context2.sent;

                if (product) {
                  _context2.next = 28;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "Error on delete product"
                });

              case 28:
                return _context2.abrupt("return", {
                  product: product
                });

              case 31:
                _context2.prev = 31;
                _context2.t4 = _context2["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch product", _context2.t4);

              case 34:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 31]]);
      }));

      function deleteProductByID(_x3, _x4) {
        return _deleteProductByID.apply(this, arguments);
      }

      return deleteProductByID;
    }(),
    updateQuantityProduct: function () {
      var _updateQuantityProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref3) {
        var productId, newquantity, schema, validation, product;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                productId = _ref3.productId, newquantity = _ref3.newquantity;
                _context3.prev = 1;
                schema = _joi["default"].object().keys({
                  productId: _joi["default"].number().id(),
                  newquantity: _joi["default"].number().min(0)
                }).required();
                validation = schema.validate({
                  productId: productId,
                  newquantity: newquantity
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
                console.log(productId);

                if (product) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt("return", {
                  errors: "can't find product !"
                });

              case 13:
                _context3.next = 15;
                return (0, _product.UpdateQuantityProduct)(productId, newquantity);

              case 15:
                product = _context3.sent;
                console.log(product);
                return _context3.abrupt("return", {
                  product: product
                });

              case 20:
                _context3.prev = 20;
                _context3.t0 = _context3["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch product", _context3.t0);

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 20]]);
      }));

      function updateQuantityProduct(_x5, _x6) {
        return _updateQuantityProduct.apply(this, arguments);
      }

      return updateQuantityProduct;
    }()
  }
};
var _default = productMutations;
exports["default"] = _default;