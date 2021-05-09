import { ApolloError } from "apollo-server";
import "@babel/polyfill";
import joi from "@hapi/joi";
import { findUserCart } from "../../../models/cart";
import { findUserById } from "../../../models/user";
const cartQueries = {
  Query: {
    findUserCart: async (_, { userId }) => {
      try {
        const schema = joi.object().keys({
          userId: joi.number().id().required(),
        });
        const validation = schema.validate({ userId });
        console.log(validation);
         if (validation.error) {
           return { errors: "error on your input values " };
         }

        const user = await findUserById(userId);
        if (!user) {
          return new Error("Can't find user");
        }
        console.log(user);
        const cart = await findUserCart(userId);
        console.log(cart);
        if (!cart) {
              return new Error("Can't  found user car");
        }
        return cart;
      } catch (err) {
        new ApolloError("Failed to fetch product", err);
      }
    },
  },
};
export default cartQueries;
