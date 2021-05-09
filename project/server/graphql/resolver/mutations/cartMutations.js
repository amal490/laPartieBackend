import "@babel/polyfill";
import { ApolloError } from "apollo-server";
import joi from "@hapi/joi";
import { findUserById } from "../../../models/user";
import {
  findProductById,
  UpdateQuantityProduct,
} from "../../../models/product";
import {
  addProductAtCart,
  deleteCartUser,
  deleteProductFromCart,
  findProductFromCart,
  findUserCart,
  updateProductQuantityfromCart,
  updateSatatusCart,
} from "../../../models/cart";
//import { Validate } from ".prisma/client";
const cartMutations = {
  Mutation: {
    addToCart: async (_, { userId, productId, quantity }) => {
      try {
        const schema = joi
          .object()
          .keys({
            userId: joi.number().id(),
            productId: joi.number().id(),
            quantity: joi.number().greater(0),
          })
          .required();
        const validation = schema.validate({ userId, productId, quantity });
        if (validation.error) {
          return { errors: "error on your input values " };
        }

        console.log(validation);
        const user = await findUserById(userId);
        if (!user) {
          return { errors: "don't found user" };
        }
        console.log(user);
        const product = await findProductById(productId);
        if (!product) {
          return { errors: "don't found Product" };
        }
        console.log(product);
        var cart = await findProductFromCart(userId, productId);
        if (cart) {
          return { errors: "Product exist on card" };
        }
        if (product.quantity < quantity) {
          return { errors: "Product quantity not disponible" };
        }
        var cart = addProductAtCart(userId, productId, quantity);
        if (!cart) {
          return { errors: "Can't create cart" };
        }
        console.log(cart);
        return { cart };
      } catch (err) {
        new ApolloError("Failed to fetch product", err);
      }
    },
    removeProductFromCart: async (_, { userId, productId }) => {
      try {
        const schema = joi
          .object()
          .keys({ userId: joi.number().id(), productId: joi.number().id() })
          .required();
        const validation = schema.validate({ userId, productId });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }

        var cart = await findProductFromCart(userId, productId);
        if (!cart) {
          return { errors: "Can't Find User or Product" };
        }
        var cart = await deleteProductFromCart(cart.cartId);
        if (!cart) {
          return { errors: "Can't delete cart" };
        }
        console.log(cart);
        return { cart };
      } catch (err) {
        new ApolloError("Failed to fetch product", err);
      }
    },
    removeCart: async (_, { userId }) => {
      try {
        const schema = joi
          .object()
          .keys({ userId: joi.number().id().required() });
        const validation = schema.validate({ userId });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }

        const user = await findUserById(userId);
        if (!user) {
          return new Error("Can't Find User ");
        }
        var cart = await findUserCart(userId);
        if (cart.length == 0) {
          return new Error(" Can't find Cart");
        }
        const data = await deleteCartUser(userId);
        if (!data) {
          return new Error("Can't  delete Cart");
        }
        return cart;
      } catch (err) {
        new ApolloError("Failed to fetch cart", err);
      }
    },
    updateProductQuantityfromCart: async (
      _,
      { userId, productId, quantity }
    ) => {
      try {
        const schema = joi
          .object()
          .keys({
            userId: joi.number().id(),
            productId: joi.number().id(),
            quantity: joi.number().min(1),
          })
          .required();
        const validation = schema.validate({ userId, productId, quantity });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }

        var cart = await findProductFromCart(userId, productId);
        console.log(cart);
        if (!cart) {
          return { errors: "Can't Find this Product on user cart" };
        }
        var productQuantity = cart.product.quantity;
        if (quantity > productQuantity) {
          return { errors: "Product quantity not disponible" };
        }
        var cart = await updateProductQuantityfromCart(cart.cartId, quantity);
        console.log(cart);
        if (!cart) {
          return { errors: "Error on update cart " };
        }
        return { cart };
      } catch (err) {
        new ApolloError("Failed to fetch cart", err);
      }
    },
    /*  validCart: async (_, { userId }) => {
      try {
        const schema = joi
          .object()
          .keys({ userId: joi.number().id().required() });

        const validation = schema.validate({ userId });
        console.log(validation);
        var cart = await findUserCart(userId);
        if (cart.length == 0) {
          return new Error("Can't find cart");
        }
        var count = 0;
        cart.forEach(async (element) => {
          if (element.validate == Validate.VALID) {
            count++;
          }
          return count;
        });
        console.log("count " + count);
        if (count > 0) {
          return new Error("Cart is already validate");
        }
        console.log(cart);
        cart.forEach(async (element) => {
          console.log(element.productId);
          let productQuantity = element.product.quantity;
          let quantity = element.quantity;
          let newquantity = productQuantity - quantity;
          if (newquantity < 0) {
            return new Error("Quantity can't be less then 0 ");
          }
          await UpdateQuantityProduct(element.productId, newquantity);
        });
        var cart = await updateSatatusCart(userId);
        if (!cart) {
          throw new Error("Error on update cart");
        }
        const cartUser = await findUserCart(userId);
        if (!cartUser) {
          throw new Error("Error on Find cart");
        }
        console.log(cartUser);
        return cartUser;
      } catch (err) {
        new ApolloError("Failed to fetch product", err);
      }
    },*/
  },
};
export default cartMutations;
