"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var userTypeDef = (0, _graphqlTag["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  enum Role {\n    ADMIN\n    INTERNAUTE\n    CLIENT\n  }\n  enum Status {\n    notActive\n    active\n    blocked\n  }\n  type User {\n    userId: ID!\n    name: String!\n    email: String!\n    username: String!\n    password: String!\n    code: Int!\n    status: Status!\n    roleId: Int!\n    role: privilagies\n    cart: [Cart]\n  }\n  input userData {\n    name: String!\n    username: String!\n    email: String!\n    password: String!\n    roleId: Int!\n    role: Role!\n  }\n\n  type privilagies {\n    roleId: Int\n    role: Role\n  }\n\n  type UserResponse {\n    user: User\n    errors: String\n  }\n\n  type Query {\n    me: UserResponse\n    logout: UserResponse\n    getUserByEmail(email: String!): UserResponse\n    getAllUsers: [User]\n    getUserByID(id: Int!): UserResponse\n    login(email: String!, password: String!): UserResponse\n  }\n  type Mutation {\n    register(\n      username: String!\n      name: String!\n      email: String!\n      password: String!\n      role: Role!\n    ): UserResponse\n    verifyMailForRegister(userId: Int!, code: Int!): UserResponse\n    verifyMailForRestPassword(\n      userId: Int!\n      code: Int!\n      password: String!\n    ): UserResponse\n    resetPassword(email: String!): UserResponse\n    deleteUserById(userId: Int!): UserResponse\n    updateUser(email: String!, newMail: String!): UserResponse\n  }\n"])));
var _default = userTypeDef;
exports["default"] = _default;