import { ApolloServer } from "apollo-server-express";
import permissions from "../graphql/permissions/permissions";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";
import TypesDef from "../graphql/typeDef/index";
import Resolver from "../graphql/resolver/resolver";
const schema = makeExecutableSchema({
  resolvers: Resolver,
  typeDefs: TypesDef,
});
const apollo = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  // schema: applyMiddleware(schema),
  context: ({ req, res }) => ({ req, res }),
  formatError: (err) => {
    return err.message;
  },
});

export default apollo;
