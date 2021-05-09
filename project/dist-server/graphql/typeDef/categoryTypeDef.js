"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var categoryTypeDef = (0, _graphqlTag["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  type Category {\n    categoryId: ID!\n    name: String!\n    subCategory: [SubCategory]\n  }\n  input CategoryData {\n    name: String!\n    categoryId: Int!\n  }\n  type CategoryResponse {\n    category: Category\n    errors: String\n  }\n  type Mutation {\n    addCategory(name: String!): CategoryResponse\n    deleteCategory(categoryId: Int!): CategoryResponse\n    updateCategory(categoryId: Int!, newName: String!): CategoryResponse\n  }\n  type Query {\n    getCategoryById(categoryId: Int!): CategoryResponse\n    getCategoryByName(name: String!): CategoryResponse\n    getAllCategories: [Category]\n  }\n"])));
var _default = categoryTypeDef;
exports["default"] = _default;