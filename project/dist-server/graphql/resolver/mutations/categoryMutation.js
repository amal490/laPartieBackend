"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _apolloServer = require("apollo-server");

var _category = require("../../../models/category");

var _subCategory = require("../../../models/subCategory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var categoryMutation = {
  Mutation: {
    addCategory: function () {
      var _addCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var name, schema, validation, isExist, category;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = _ref.name;
                _context.prev = 1;
                schema = _joi["default"].object().keys({
                  name: _joi["default"].string().min(4).max(50).required().regex(/^[a-zA-Z]+[ a-zA-Z]*$/)
                });
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
                return (0, _category.findCategoryByName)(name);

              case 9:
                isExist = _context.sent;

                if (!isExist) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", {
                  errors: "Failed to add Category by the same name "
                });

              case 12:
                _context.next = 14;
                return (0, _category.createCategory)(name);

              case 14:
                category = _context.sent;
                return _context.abrupt("return", {
                  category: category
                });

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](1);
                new _apolloServer.ApolloError("Failed to add Category");

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 18]]);
      }));

      function addCategory(_x, _x2) {
        return _addCategory.apply(this, arguments);
      }

      return addCategory;
    }(),
    deleteCategory: function () {
      var _deleteCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref2) {
        var categoryId, schema, validation, category, transaction;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                categoryId = _ref2.categoryId;
                _context2.prev = 1;
                schema = _joi["default"].object().keys({
                  categoryId: _joi["default"].number().id().required()
                });
                validation = schema.validate({
                  categoryId: categoryId
                });
                console.log(validation);

                if (!validation.error) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "error on name of category"
                });

              case 7:
                _context2.next = 9;
                return (0, _category.findCategoryById)(categoryId);

              case 9:
                category = _context2.sent;

                if (category) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "can't find Category !"
                });

              case 12:
                _context2.t0 = _category.deleteCategoryAndSubCategory;
                _context2.next = 15;
                return (0, _subCategory.deleteSubCategoryByCategoryId)(categoryId);

              case 15:
                _context2.t1 = _context2.sent;
                _context2.next = 18;
                return (0, _category.deleteCategoryById)(categoryId);

              case 18:
                _context2.t2 = _context2.sent;
                _context2.t3 = [_context2.t1, _context2.t2];
                _context2.next = 22;
                return (0, _context2.t0)(_context2.t3);

              case 22:
                transaction = _context2.sent;

                if (transaction) {
                  _context2.next = 25;
                  break;
                }

                return _context2.abrupt("return", {
                  errors: "Error on delete category"
                });

              case 25:
                return _context2.abrupt("return", {
                  category: category
                });

              case 28:
                _context2.prev = 28;
                _context2.t4 = _context2["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch Category", _context2.t4);

              case 31:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 28]]);
      }));

      function deleteCategory(_x3, _x4) {
        return _deleteCategory.apply(this, arguments);
      }

      return deleteCategory;
    }(),
    updateCategory: function () {
      var _updateCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref3) {
        var categoryId, newName, schema, validation, isExist, category;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                categoryId = _ref3.categoryId, newName = _ref3.newName;
                _context3.prev = 1;
                schema = _joi["default"].object().keys({
                  categoryId: number().id(),
                  newName: _joi["default"].string().min(4).max(50).regex(/^[a-zA-Z]+[ a-zA-Z]*$/)
                }).required();
                validation = schema.validate({
                  newName: newName,
                  categoryId: categoryId
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
                return (0, _category.findCategoryById)(categoryId);

              case 9:
                isExist = _context3.sent;

                if (isExist) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", {
                  errors: "can't find Category !"
                });

              case 12:
                _context3.next = 14;
                return (0, _category.UpdateCategoryName)(categoryId, newName);

              case 14:
                category = _context3.sent;
                return _context3.abrupt("return", {
                  category: category
                });

              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3["catch"](1);
                new _apolloServer.ApolloError("Failed to fetch  subCategory", _context3.t0);

              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 18]]);
      }));

      function updateCategory(_x5, _x6) {
        return _updateCategory.apply(this, arguments);
      }

      return updateCategory;
    }()
  }
};
var _default = categoryMutation;
exports["default"] = _default;