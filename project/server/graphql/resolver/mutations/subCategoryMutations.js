import "@babel/polyfill";
import { ApolloError } from "apollo-server";
import joi from "@hapi/joi";
import { findCategoryByName } from "../../../models/category";
import {
  deleteProductDefaultImage,
  deleteProductImages,
  deleteAllProductImages,
  deleteProductsBySubCategoryId,
} from "../../../models/product";
import {
  createSubCategory,
  findSubCategoryByName,
  UpdateSubCategoryName,
  findSubCategoryById,
  deleteSubCategoryById,
} from "../../../models/subCategory";

const subCategoryMutations = {
  Mutation: {
    addSubCategory: async (_, { name, nameCategory }) => {
      try {
        const schema = joi
          .object()
          .keys({
            name: joi
              .string()
              .min(4)
              .max(50)
              .regex(/^[a-zA-Z]+[ a-zA-Z]*$/),
            nameCategory: joi
              .string()
              .min(4)
              .max(50)
              .regex(/^[a-zA-Z]+[ a-zA-Z]*$/),
          })
          .required();
        const validation = schema.validate({ name });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on name of category" };
        }
        let isExist = await findSubCategoryByName(name);
        if (isExist) {
          return { errors: "Failed to add sousCategory by the same name " };
        }
        let category = await findCategoryByName(nameCategory);
        if (!category) {
          return { errors: "category not found " };
        }
        const subCategory = await createSubCategory(name, category.categoryId);
        return { subCategory };
      } catch (err) {
        new ApolloError("Failed to add sousCategory");
      }
    },

    deleteSubCategory: async (_, { subCategoryId }) => {
      try {
        const schema = joi.object().keys({
          subCategoryId: joi.number().id().required(),
        });
        const validation = schema.validate({ subCategoryId });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on name of category" };
        }
        var subCategory = await findSubCategoryById(subCategoryId);
        if (!subCategory) return { errors: "can't find subCategory !" };
        var products = subCategory.products;
        products.forEach(async (element) => {
          await deleteAllProductImages([
            await deleteProductDefaultImage(element.productId),
            await deleteProductImages(element.productId),
          ]);
        });
        const product = await deleteProductsBySubCategoryId(subCategoryId);
        if (!product) {
          return { errors: "Error on delete product" };
        }
        var subCategory = await deleteSubCategoryById(subCategoryId);
        return { subCategory };
      } catch (err) {
        new ApolloError("Failed to fetch subCategory", err);
      }
    },

    updateSubCategory: async (_, { subCategoryId, newName }) => {
      try {
        const schema = joi
          .object()
          .keys({
            subCategoryId: joi.number().id(),
            newName: joi
              .string()
              .min(4)
              .max(50)
              .regex(/^[a-zA-Z]+[ a-zA-Z]*$/),
          })
          .required();
        const validation = schema.validate({ subCategoryId, newName });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on name of category" };
        }
        const isExist = await findSubCategoryById(subCategoryId);
        if (!isExist) return { errors: "can't find Sub Category !" };
        const isNameExist = await findSubCategoryByName(newName);
        if (isNameExist) {
          return {
            errors: "this  Sub Category name is exist  ",
          };
        }
        const subCategory = await UpdateSubCategoryName(subCategoryId, newName);
        return { subCategory };
      } catch (err) {
        new ApolloError("Failed to fetch  Sub Category", err);
      }
    },
  },
};

export default subCategoryMutations;
