"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _merge = require("@graphql-tools/merge");

var _productMutations = _interopRequireDefault(require("./mutations/productMutations"));

var _subCategoryMutations = _interopRequireDefault(require("./mutations/subCategoryMutations"));

var _userMutations = _interopRequireDefault(require("./mutations/userMutations"));

var _productQuery = _interopRequireDefault(require("./queries/productQuery"));

var _userQuery = _interopRequireDefault(require("./queries/userQuery"));

var _subCategoryQuery = _interopRequireDefault(require("./queries/subCategoryQuery"));

var _categoryQuery = _interopRequireDefault(require("./queries/categoryQuery"));

var _categoryMutation = _interopRequireDefault(require("./mutations/categoryMutation"));

var _cartMutations = _interopRequireDefault(require("./mutations/cartMutations"));

var _cartQuery = _interopRequireDefault(require("./queries/cartQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*import path from "path";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
const resolversArray = loadFilesSync(path.join(__dirname, './*'), { extensions: ['js'] },{ recursive: true });
 export default  mergeResolvers(resolversArray);*/
var resolvers = [_userMutations["default"], _productQuery["default"], _userQuery["default"], _productMutations["default"], _subCategoryMutations["default"], _subCategoryQuery["default"], _categoryQuery["default"], _categoryMutation["default"], _cartMutations["default"], _cartQuery["default"]];

var _default = (0, _merge.mergeResolvers)(resolvers);

exports["default"] = _default;