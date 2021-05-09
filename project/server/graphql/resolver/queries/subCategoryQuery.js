import "@babel/polyfill";
import { ApolloError } from "apollo-server";
import joi from "@hapi/joi";
import {
  getAllSubCategories,
  findSubCategoryById,
  findSubCategoryByName,
} from "../../../models/subCategory";
const subCategoryQuery = {
  Query: {
    getSubCategoryById: async (_, { subCategoryId }) => {
      try {
        const schema = joi.object().keys({
          subCategoryId: joi.number().id().required(),
        });
        const validation = schema.validate({ subCategoryId });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on name of category" };
        }
        const subCategory = await findSubCategoryById(subCategoryId);
        console.log(subCategory);
        if (!subCategory) {
          return { errors: "this subCategory is not found on data base " };
        }
        return { subCategory };
      } catch (err) {
        new ApolloError("Failed to fetch subCategoryId", err);
      }
    },
    getSubCategoryByName: async (_, { name }) => {
      try {
        const schema = joi.object().keys({
          name: joi
            .string()
            .min(4)
            .max(50)
            .regex(/^[a-zA-Z]+[ a-zA-Z]*$/)
            .required(),
        });
        const validation = schema.validate({ name });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on name of category" };
        }
        const subCategory = await findSubCategoryByName(name);
        if (!subCategory) {
          return { errors: "subCategories not found on data base " };
        }
        return { subCategory };
      } catch (err) {
        new ApolloError("Failed to fetch subCategories name", err);
      }
    },

    getAllSubCategories: async () => {
      try {
        const subCategories = await getAllSubCategories();
        return subCategories;
      } catch (err) {
        new ApolloError("Failed to fetch all the subCategories", { err });
      }
    },
  },
};
export default subCategoryQuery;
