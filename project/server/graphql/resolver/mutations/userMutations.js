import bcrypt from "bcryptjs";
import { ApolloError } from "apollo-server";
import "@babel/polyfill";
import jwt from "jsonwebtoken";
import random from "random";
import joi from "@hapi/joi";
import {
  findUserByEmailAndUsername,
  createUserData,
  findUserById,
  updateVerificationCode,
  sendVerficationCode,
  isCodeCorrect,
  deleteUserById,
  findUserByEmail,
  updateUserPassword,
  updateStatus,
  findIdRoleByName,
} from "../../../models/user";
import { Status } from ".prisma/client";
const userMutations = {
  Mutation: {
    register: async (_, { email, username, name, password, role }) => {
      try {
        const schema = joi
          .object()
          .keys({
            email: joi.string().email(),
            username: joi.string().alphanum().min(5).max(20),
            name: joi.string().min(3).max(20),
            password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            role: joi.string(),
          })
          .required();
        const data = { email, username, name, password, role };
        const validation = schema.validate(data);
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }
        const user = await findUserByEmailAndUsername(username, email);
        if (user.length >= 1) {
          return { errors: "Failed to Register the User by the same email" };
        }
        if (user.length == 0) {
          const data = await findIdRoleByName(role);
          var secretCode = random.int(1000, 5999);
          await sendVerficationCode(email, secretCode);
          let hashedpassword = await bcrypt.hash(password, 10);

          let user = await createUserData(
            name,
            username,
            email,
            hashedpassword,
            data.roleId,
            secretCode
          );
          console.log(user);
          if (!user) {
            return { errors: "Error on registration" };
          }
          return { user };
        }
      } catch (err) {
        new ApolloError("Failed to Register the User");
      }
    },
    verifyMailForRegister: async (_, { userId, code }, ctx) => {
      try {
        const schema = joi
          .object()
          .keys({
            userId: joi.number().id(),
            code: joi.number(),
          })
          .required();
        const validation = schema.validate({ userId, code });
        if (validation.error) {
          return { errors: "error on your input values " };
        }
        var user = await findUserById(userId);
        console.log(user);
        if (!user) {
          return { errors: "Can't Find User" };
        }
        var secretCode = user.code;
        var verification = isCodeCorrect(secretCode, code);
        if (!verification) {
          await updateStatus(user.userId, Status.notActive);
          return { errors: "Code Incorrecte " };
        }
        var user = await updateStatus(user.userId, Status.active);
        if (user) {
          const accessToken = jwt.sign({ userId: user.userId }, "token", {
            expiresIn: "7d",
          });
          ctx.res.cookie("accessToken", accessToken);
          return { user };
        }
      } catch (err) {
        new ApolloError("Failed to Register the User");
      }
    },
    resetPassword: async (_, { email }) => {
      try {
        const schema = joi.object().keys({
          email: joi.string().email().required(),
        });
        const validation = schema.validate(email);
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }
        var user = await findUserByEmail(email);
        if (!user) {
          return { errors: "Can't find User" };
        }
        var secretCode = random.int(0, 5999);
        var user = await updateVerificationCode(user.userId, secretCode);
        if (user) {
          await sendVerficationCode(email, secretCode);
        }
        return { user };
      } catch (err) {
        new ApolloError("Failed to Register the User");
      }
    },
    verifyMailForRestPassword: async (_, { userId, code, password }) => {
      try {
        const schema = joi
          .object()
          .keys({
            userId: joi.number().id(),
            code: joi.number(),
            password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
          })
          .required();
        const validation = schema.validate({ userId, code, password });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on password" };
        }
        var user = await findUserById(userId);
        console.log(user);
        if (!user) {
          return { errors: "Can't Find User" };
        }
        var secretCode = user.code;
        var verification = isCodeCorrect(secretCode, code);
        console.log(verification);
        if (!verification) {
          return { errors: "Code Incorrecte " };
        }

        let hashedpassword = await bcrypt.hash(password, 10);
        var user = await updateUserPassword(user.userId, hashedpassword);

        return { user };
      } catch (err) {
        new ApolloError("Failed to Register the User");
      }
    },
    deleteUserById: async (_, { userId }) => {
      try {
        const schema = joi.object().keys({
          userId: joi.number().id().required(),
        });
        const validation = schema.validate(userId);
        console.log(validation);
        if (validation.error) {
          return { errors: "error on password" };
        }
        const isExist = await findUserById(userId);
        if (!isExist) return { errors: "can't find user !" };

        const user = await deleteUserById(userId);
        return { user };
      } catch (err) {
        new ApolloError("Failed to fetch username", err);
      }
    },
  },
};
export default userMutations;
