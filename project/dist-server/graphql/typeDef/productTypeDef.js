"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var productTypeDef = (0, _graphqlTag["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  type Product {\n    productId: ID!\n    name: String!\n    price: Int!\n    description: String!\n    codeProd: String!\n    quantity: Int! \n    subCategoryId: Int!\n    defaultImage: defaultImage\n    images: [images]\n    subCategory: SubCategory\n    cart: [Cart]\n  }\n  type defaultImage {\n    defaultImageId: ID!\n    url: String!\n  }\n  type images {\n    imagesId: ID!\n    url: String!\n  }\n  input ProductData {\n    name: String!\n    price: Int!\n    description: String!\n    codeProd: String!\n    quantity: Int!\n    defaultImage: String!\n    images: [String!]\n    subCategoryId: Int!\n  }\n  type ProductResponse {\n    product: Product\n    errors: String\n  }\n  type Mutation {\n    addProduct(\n      name: String!\n      price: Int!\n      rating: Int!\n      description: String!\n      codeProd: String!\n      quantity: Int!\n      subCategoryName: String!\n      defaultImage: String!\n      images: [String!]\n    ): ProductResponse\n    deleteProductByID(productId: Int!): ProductResponse\n    updateQuantityProduct(productId: Int!, newquantity: Int!): ProductResponse\n  }\n  type Query {\n    getProductById(productId: Int!): ProductResponse\n    getProductByCodeprod(codeProd: String!): ProductResponse\n    getAllProducts: [Product]\n    getRelatedProducts(productId: Int!): [Product]\n  }\n"])));
var _default = productTypeDef;
exports["default"] = _default;