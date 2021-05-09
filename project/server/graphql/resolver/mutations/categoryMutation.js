import "@babel/polyfill";
import joi from "@hapi/joi";
import { ApolloError } from "apollo-server";
import {
  findCategoryByName,
  findCategoryById,
  createCategory,
  UpdateCategoryName,
  deleteCategoryAndSubCategory,
  deleteCategoryById,
} from "../../../models/category";

import { deleteSubCategoryByCategoryId } from "../../../models/subCategory";

const categoryMutation = {
  Mutation: {
    addCategory: async (_, { name }) => {
      try {
        const schema = joi.object().keys({
          name: joi
            .string()
            .min(4)
            .max(50)
            .required()
            .regex(/^[a-zA-Z]+[ a-zA-Z]*$/),
        });
        const validation = schema.validate({ name });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on name of category" };
        }
        const isExist = await findCategoryByName(name);
        if (isExist) {
          return { errors: "Failed to add Category by the same name " };
        }
        const category = await createCategory(name);
        return { category };
      } catch (err) {
        new ApolloError("Failed to add Category");
      }
    },

    deleteCategory: async (_, { categoryId }) => {
      try {
        const schema = joi.object().keys({
          categoryId: joi.number().id().required(),
        });
        const validation = schema.validate({ categoryId });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on name of category" };
        }
        const category = await findCategoryById(categoryId);
        if (!category) return { errors: "can't find Category !" };
        const transaction = await deleteCategoryAndSubCategory([
          await deleteSubCategoryByCategoryId(categoryId),
          await deleteCategoryById(categoryId),
        ]);
        if (!transaction) {
          return { errors: "Error on delete category" };
        }
        return { category };
      } catch (err) {
        new ApolloError("Failed to fetch Category", err);
      }
    },

    updateCategory: async (_, { categoryId, newName }) => {
      try {
        const schema = joi
          .object()
          .keys({
            categoryId: number().id(),
            newName: joi
              .string()
              .min(4)
              .max(50)
              .regex(/^[a-zA-Z]+[ a-zA-Z]*$/),
          })
          .required();
        const validation = schema.validate({ newName, categoryId });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on name of category" };
        }
        const isExist = await findCategoryById(categoryId);
        if (!isExist) return { errors: "can't find Category !" };
        const category = await UpdateCategoryName(categoryId, newName);
        return { category };
      } catch (err) {
        new ApolloError("Failed to fetch  subCategory", err);
      }
    },
  },
};

export default categoryMutation;
