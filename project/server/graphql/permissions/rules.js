import { rule, and, or, not } from "graphql-shield";
import { ApolloError } from "apollo-server";
import { findUserById } from "../../models/user";
import { Role, Status } from ".prisma/client";
export const isAdmin = rule({ cache: "contextual" })(async (_, {}, ctx) => {
  try {
    const userid = await ctx.req.userId;
    const user = await findUserById(userid);
    var role = user.role;
    if (role.role === Role.ADMIN) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    new ApolloError("Failed to fetch the User", { err });
  }
});
export const isClient = rule({ cache: "contextual" })(async (_, {}, ctx) => {
  try {
    let userid = await ctx.req.userId;
    const user = await findUserById(userid);
    if (!user) {
      return { errors: "not authentificated" };
    }
    var role = user.role;
    if (role.role === Role.CLIENT) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    new ApolloError("Failed to fetch the User", { err });
  }
});
export const isStatusActive = rule({ cache: "contextual" })(
  async (_, {}, ctx) => {
    try {
      let userid = await ctx.req.userId;
      var user = await findUserById(userid);
      console.log(user);
      if (!user) {
        return { errors: "not authentificated" };
      }
      if (user.status === Status.active) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      new ApolloError("Failed to fetch the User", { err });
    }
  }
);
export const isAuthenticated = rule({ cache: "contextual" })(
  async (_, {}, ctx) => {
    try {
      let userid = await ctx.req.userId;
      const user = await findUserById(userid);
      if (!user) {
        return false;
      }
      return true;
    } catch (err) {
      new ApolloError("Failed to fetch the User", { err });
    }
  }
);
