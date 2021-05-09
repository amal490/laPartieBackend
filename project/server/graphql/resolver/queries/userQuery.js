import bcrypt from "bcryptjs";
import { ApolloError } from "apollo-server";
import jwt from "jsonwebtoken";
import "@babel/polyfill";
import joi from "@hapi/joi";
import {
  findAllUsers,
  findUserById,
  findUserByEmail,
} from "../../../models/user";
const userQueries = {
  Query: {
    getUserByEmail: async (_, { email }) => {
      try {
        const schema = joi.object().keys({
          email: joi.string().email().required(),
        });
        const validation = schema.validate({ email });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }
        const user = await findUserByEmail(email);
        if (!user) {
          return { errors: "username not found on data base " };
        }
        return { user };
      } catch (err) {
        new ApolloError("Failed to fetch username", err);
      }
    },
    getAllUsers: async () => {
      try {
        const users = await findAllUsers();
        return users;
      } catch (err) {
        new ApolloError("Failed to fetch all the Users", { err });
      }
    },
    getUserByID: async (_, { id }) => {
      try {
        const schema = joi.object().keys({
          id: joi.number().required(),
        });
        const validation = schema.validate({ id });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }
        const user = await findUserById(id);
        if (!user) {
          return { errors: "id not found on data base " };
        }
        console.log(user);
        return { user };
      } catch (err) {
        new ApolloError("Failed to fetch userID", err);
      }
    },
    login: async (_, { email, password }, ctx) => {
      try {
        const schema = joi
          .object()
          .keys({
            email: joi.string().email(),
            password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
          })
          .required();
        const validation = schema.validate({ email, password });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }
        const user = await findUserByEmail(email);
        if (!user) {
          return { errors: "User not found" };
        }

        let compare = await bcrypt.compare(password, user.password);
        if (!compare) {
          return { errors: "User not found" };
        }
        const accessToken = jwt.sign({ userId: user.userId }, "token", {
          expiresIn: "7d",
        });
        ctx.res.cookie("accessToken", accessToken);
        return { user };
      } catch (err) {
        new ApolloError("Failed to fetch userID", err);
      }
    },
    logout: async (_, {}, ctx) => {
      try {
        let userid = ctx.req.userId;
        if (!userid) return { errors: "not authenticated" };
        const user = await findUserById(userid);
        ctx.res.clearCookie("accessToken");
        return { user };
      } catch (err) {
        return { errors: err };
      }
    },
    me: async (_, {}, ctx) => {
      console.log(ctx.req.userId);
      try {
        let userid = ctx.req.userId;
        if (!userid) return { errors: "not authenticated" };
        const user = await findUserById(userid);
        return { user };
      } catch (err) {
        return { errors: err };
      }
    },
  },
};
export default userQueries;
