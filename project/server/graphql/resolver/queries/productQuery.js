import "@babel/polyfill";
import { ApolloError } from "apollo-server";
import joi from "@hapi/joi";
import {
  findProductByCode,
  findProductById,
  getAllProducts,
  getRelatedProducts,
} from "../../../models/product";
const productQuery = {
  Query: {
    getProductById: async (_, { productId }) => {
      try {
        const schema = joi.object().keys({
          productId: joi.number().id().required(),
        });
        const validation = schema.validate({ productId });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }
        const product = await findProductById(productId);
        console.log(product);
        if (!product) {
          return { errors: "id not found on data base " };
        }
        return { product };
      } catch (err) {
        new ApolloError("Failed to fetch productID", err);
      }
    },
    getProductByCodeprod: async (_, { codeProd }) => {
      try {
        const schema = joi.object().keys({
          codeProd: joi.string().alphanum().required(),
        });
        const validation = schema.validate({ codeProd });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }
        const product = await findProductByCode(codeProd);
        if (!product) {
          return { errors: "codeprod not found on data base " };
        }
        return { product };
      } catch (err) {
        new ApolloError("Failed to fetch productID", err);
      }
    },
    getRelatedProducts: async (_, { productId }) => {
      try {
        const schema = joi.object().keys({
          productId: joi.number().id().required(),
        });
        const validation = schema.validate({ productId });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }
        var product = await findProductById(productId);
        if (!product) {
          return { errors: "Product not found on db" };
        }
        const products = await getRelatedProducts(product.subCategoryId);
        return products;
      } catch (err) {
        new ApolloError("Failed to fetch all the Users", { err });
      }
    },
    getAllProducts: async () => {
      try {
        const products = await getAllProducts();
        return products;
      } catch (err) {
        new ApolloError("Failed to fetch all the Users", { err });
      }
    },
  },
};
export default productQuery;
