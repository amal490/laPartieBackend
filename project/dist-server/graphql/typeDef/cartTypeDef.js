"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var cartTypeDef = (0, _graphqlTag["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  enum Validate {\n    VALID\n    NOTVALID\n  }\n  type Cart {\n    cartId: ID!\n    quantity: Int!\n    validate: Validate!\n    productId: Int!\n    userId: Int!\n    product: Product\n  }\n  input CartData {\n    quantity: Int!\n    isValid: Validate!\n    productId: Int!\n    userId: Int!\n  }\n  type CartResponse {\n    cart: Cart\n    errors: String\n  }\n\n  type Mutation {\n    addToCart(userId: Int!, productId: Int!, quantity: Int!): CartResponse\n    removeProductFromCart(userId: Int!, productId: Int!): CartResponse\n    updateProductQuantityfromCart(\n      userId: Int!\n      productId: Int!\n      quantity: Int!\n    ): CartResponse\n    removeCart(userId: Int!): [Cart]\n  }\n  type Query {\n    findUserCart(userId: Int!): [Cart]\n  }\n"])));
var _default = cartTypeDef;
exports["default"] = _default;