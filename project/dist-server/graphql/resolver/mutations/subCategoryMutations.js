"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _apolloServer = require("apollo-server");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _category = require("../../../models/category");

var _product = require("../../../models/product");

var _subCategory = require("../../../models/subCategory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var subCategoryMutations = {
  Mutation: {
    addSubCategory: function () {
      var _addSubCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var name, nameCategory, schema, validation, isExist, category, subCategory;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = _ref.name, nameCategory = _ref.nameCategory;
                _context.prev = 1;
                schema = _joi["default"].object().keys({
                  name: _joi["default"].string().min(4).max(50).regex(/^[a-zA-Z]+[ a-zA-Z]*$/),
                  nameCategory: _joi["default"].string().min(4).max(50).regex(/^[a-zA-Z]+[ a-zA-Z]*$/)
                }).required();
                validation = schema.validate({
                  name: name
                });
                console.log(validation);

                if (!validation.error) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "error on name of category"
                });

              case 7:
                _context.next = 9;
                return (0, _subCategory.findSubCategoryByName)(name);

              case 9:
                isExist = _context.sent;

                if (!isExist) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "Failed to add sousCategory by the same name "
                });

              case 12:
                _context.next = 14;
                return (0, _category.findCategoryByName)(nameCategory);

              case 14:
                category = _context.sent;

                if (category) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "category not found "
                });

              case 17:
                _context.next = 19;
                return (0, _subCategory.createSubCategory)(name, category.categoryId);

              case 19:
                subCategory = _context.sent;
                return _context.abrupt("return", {
                  subCategory: subCategory
                });

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](1);
                new _apolloServer.ApolloError("Failed to add sousCategory");

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 23]]);
      }));

      function addSubCategory(_x, _x2) {
        return _addSubCategory.apply(this, arguments);
      }

      return addSubCategory;
    }(),
    deleteSubCategory: function () {
      var _deleteSubCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref2) {
        var subCategoryId, schema, validation, subCategory, products, product;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                subCategoryId = _ref2.subCategoryId;
                _context3.prev = 1;
                schema = _joi["default"].object().keys({
                  subCategoryId: _joi["default"].number().id().required()
                });
                validation = schema.validate({
                  subCategoryId: subCategoryId
                });
                console.log(validation);

                if (!validation.error) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", {
                  errors: "error on name of category"
                });

              case 7:
                _context3.next = 9;
                return (0, _subCategory.findSubCategoryById)(subCategoryId);

              case 9:
                subCategory = _context3.sent;

                if (subCategory) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", {
                  errors: "can't find subCategory !"
                });

              case 12:
                products = subCategory.products;
                products.forEach( /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(element) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.t0 = _product.deleteAllProductImages;
                            _context2.next = 3;
                            return (0, _product.deleteProductDefaultImage)(element.productId);

                          case 3:
                            _context2.t1 = _context2.sent;
                            _context2.next = 6;
                            return (0, _product.deleteProductImages)(element.productId);

                          case 6:
                            _context2.t2 = _context2.sent;
                            _context2.t3 = [_context2.t1, _context2.t2];
                            _context2.next = 10;
                            return (0, _context2.t0)(_context2.t3);

                          case 10:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x5) {
                    return _ref3.apply(this, arguments);
                  };
                }());
                _context3.next = 16;
                return (0, _product.deleteProductsBySubCategoryId)(subCategoryId);

              case 16:
                product = _context3.sent;

                if (product) {
                  _context3.next = 19;
                  break;
                }

                return _context3.abrupt("return", {
                  errors: "Error on delete product"
                });

              case 19:
                _context3.next = 21;
                return (0, _subCategory.deleteSubCategoryById)(subCategoryId);

              case 21:
                subCategory = _context3.sent;
                return _context3.abrupt("return", {
                  subCategory: subCategory
                });

              case 25:
                _context3.prev = 25;
                _context3.t0 = _context3["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch subCategory", _context3.t0);

              case 28:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 25]]);
      }));

      function deleteSubCategory(_x3, _x4) {
        return _deleteSubCategory.apply(this, arguments);
      }

      return deleteSubCategory;
    }(),
    updateSubCategory: function () {
      var _updateSubCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref4) {
        var subCategoryId, newName, schema, validation, isExist, isNameExist, subCategory;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                subCategoryId = _ref4.subCategoryId, newName = _ref4.newName;
                _context4.prev = 1;
                schema = _joi["default"].object().keys({
                  subCategoryId: _joi["default"].number().id(),
                  newName: _joi["default"].string().min(4).max(50).regex(/^[a-zA-Z]+[ a-zA-Z]*$/)
                }).required();
                validation = schema.validate({
                  subCategoryId: subCategoryId,
                  newName: newName
                });
                console.log(validation);

                if (!validation.error) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", {
                  errors: "error on name of category"
                });

              case 7:
                _context4.next = 9;
                return (0, _subCategory.findSubCategoryById)(subCategoryId);

              case 9:
                isExist = _context4.sent;

                if (isExist) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt("return", {
                  errors: "can't find Sub Category !"
                });

              case 12:
                _context4.next = 14;
                return (0, _subCategory.findSubCategoryByName)(newName);

              case 14:
                isNameExist = _context4.sent;

                if (!isNameExist) {
                  _context4.next = 17;
                  break;
                }

                return _context4.abrupt("return", {
                  errors: "this  Sub Category name is exist  "
                });

              case 17:
                _context4.next = 19;
                return (0, _subCategory.UpdateSubCategoryName)(subCategoryId, newName);

              case 19:
                subCategory = _context4.sent;
                return _context4.abrupt("return", {
                  subCategory: subCategory
                });

              case 23:
                _context4.prev = 23;
                _context4.t0 = _context4["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch  Sub Category", _context4.t0);

              case 26:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 23]]);
      }));

      function updateSubCategory(_x6, _x7) {
        return _updateSubCategory.apply(this, arguments);
      }

      return updateSubCategory;
    }()
  }
};
var _default = subCategoryMutations;
exports["default"] = _default;