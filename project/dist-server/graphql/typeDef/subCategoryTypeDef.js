"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var subCategoryTypeDef = (0, _graphqlTag["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  type SubCategory {\n    subCategoryId: ID!\n    name: String!\n    categoryId: Int!\n    category: Category\n    products: [Product!]\n  }\n  input SubCategoryData {\n    name: String!\n    categoryId: Int!\n  }\n  type SubCategoryResponse {\n    subCategory: SubCategory\n    errors: String\n  }\n  type Mutation {\n    addSubCategory(name: String!, nameCategory: String!): SubCategoryResponse\n    deleteSubCategory(subCategoryId: Int!): SubCategoryResponse\n    updateSubCategory(\n      subCategoryId: Int!\n      newName: String!\n    ): SubCategoryResponse\n  }\n  type Query {\n    getSubCategoryById(subCategoryId: Int!): SubCategoryResponse\n    getSubCategoryByName(name: String!): SubCategoryResponse\n    getAllSubCategories: [SubCategory]\n  }\n"])));
var _default = subCategoryTypeDef;
exports["default"] = _default;