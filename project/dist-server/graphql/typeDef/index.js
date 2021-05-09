"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _merge = require("@graphql-tools/merge");

var _cartTypeDef = _interopRequireDefault(require("./cartTypeDef"));

var _categoryTypeDef = _interopRequireDefault(require("./categoryTypeDef"));

var _productTypeDef = _interopRequireDefault(require("./productTypeDef"));

var _subCategoryTypeDef = _interopRequireDefault(require("./subCategoryTypeDef"));

var _userTypeDef = _interopRequireDefault(require("./userTypeDef"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var types = [_productTypeDef["default"], _userTypeDef["default"], _categoryTypeDef["default"], _subCategoryTypeDef["default"], _cartTypeDef["default"]];

var _default = (0, _merge.mergeTypeDefs)(types);

exports["default"] = _default;