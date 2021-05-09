"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _permissions = _interopRequireDefault(require("../graphql/permissions/permissions"));

var _graphqlMiddleware = require("graphql-middleware");

var _schema = require("@graphql-tools/schema");

var _index = _interopRequireDefault(require("../graphql/typeDef/index"));

var _resolver = _interopRequireDefault(require("../graphql/resolver/resolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = (0, _schema.makeExecutableSchema)({
  resolvers: _resolver["default"],
  typeDefs: _index["default"]
});
var apollo = new _apolloServerExpress.ApolloServer({
  schema: (0, _graphqlMiddleware.applyMiddleware)(schema, _permissions["default"]),
  // schema: applyMiddleware(schema),
  context: function context(_ref) {
    var req = _ref.req,
        res = _ref.res;
    return {
      req: req,
      res: res
    };
  },
  formatError: function formatError(err) {
    return err.message;
  }
});
var _default = apollo;
exports["default"] = _default;