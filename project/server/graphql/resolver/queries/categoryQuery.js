import "@babel/polyfill";
import joi from "@hapi/joi";
import { ApolloError } from "apollo-server";
import {
  findCategoryById,
  findCategoryByName,
  getAllCategories,
} from "../../../models/category";
const categorieQuery = {
  Query: {
    getCategoryById: async (_, { categoryId }) => {
      try {
        const schema = joi.object().keys({
          categoryId: joi.number().id().required(),
        });
        const validation = schema.validate({ categoryId });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on input " };
        }
        const category = await findCategoryById(categoryId);
        console.log(category);
        if (!category) {
          return { errors: "categorie not found on data base " };
        }
        return { category };
      } catch (err) {
        new ApolloError("Failed to fetch categorieID", err);
      }
    },
    getCategoryByName: async (_, { name }) => {
      try {
        const schema = joi.object().keys({
          name: joi
            .string()
            .min(4)
            .max(50)
            .regex(/^[a-zA-Z]+[ a-zA-Z]*$/),
        });
        const validation = schema.validate({ name });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on input " };
        }
        const category = await findCategoryByName(name);
        if (!category) {
          return { errors: "category not found on data base " };
        }
        return { category };
      } catch (err) {
        new ApolloError("Failed to fetch categoryName", err);
      }
    },
    getAllCategories: async () => {
      try {
        const category = await getAllCategories();
        return category;
      } catch (err) {
        new ApolloError("Failed to fetch all the Users", { err });
      }
    },
  },
};
export default categorieQuery;
