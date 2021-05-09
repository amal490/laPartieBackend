import "@babel/polyfill";
import { ApolloError } from "apollo-server";
import joi from "@hapi/joi";
import {
  createProduct,
  findProductByCode,
  findProductById,
  deleteProductById,
  UpdateQuantityProduct,
  createImage,
  deleteProductDefaultImage,
  deleteProductImages,
  deleteAllProductImages,
} from "../../../models/product";
import { findSubCategoryByName } from "../../../models/subCategory";
const productMutations = {
  Mutation: {
    addProduct: async (
      _,
      {
        name,
        price,
        rating,
        description,
        codeProd,
        quantity,
        subCategoryName,
        defaultImage,
        images,
      }
    ) => {
      try {
        const schema = joi
          .object()
          .keys({
            name: joi.string().alphanum().min(3).max(70),
            price: joi.number(),
            rating: joi.number().min(1).max(5),
            description: joi.string(),
            codeProd: joi.string(),
            quantity: joi.number(),
            subCategoryName: joi.string().min(4).max(50),
            defaultImage: joi.string(),
            images: joi.array(),
          })
          .required();
        const data = {
          name,
          price,
          rating,
          codeProd,
          description,
          quantity,
          subCategoryName,
          defaultImage,
          images,
        };
        const validation = schema.validate(data);
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }

        const isCodeProdExist = await findProductByCode(codeProd);
        if (isCodeProdExist) {
          return { errors: "Failed to add product by the same code " };
        }
        const subCategory = await findSubCategoryByName(subCategoryName);
        if (!subCategory) {
          return { errors: "sub category  not found ! " };
        }
        const product = await createProduct(
          name,
          price,
          rating,
          description,
          codeProd,
          quantity,
          subCategory.subCategoryId,
          defaultImage
        );
        images.forEach((element) => {
          createImage(element, product.productId);
        });
        return { product };
      } catch (err) {
        new ApolloError("Failed to add Product");
      }
    },

    deleteProductByID: async (_, { productId }) => {
      try {
        const schema = joi.object().keys({
          productId: joi.number().id().required(),
        });
        const validation = schema.validate({ productId });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }
        const isExist = await findProductById(productId);
        if (!isExist) return { errors: "can't find product !" };
        const transaction = deleteAllProductImages([
          await deleteProductDefaultImage(productId),
          await deleteProductImages(productId),
        ]);
        if (!transaction) {
          return { errors: "Error on delete product" };
        }
        const product = await deleteProductById(productId);
        if (!product) {
          return { errors: "Error on delete product" };
        }
        return { product };
      } catch (err) {
        new ApolloError("Failed to fetch product", err);
      }
    },
    updateQuantityProduct: async (_, { productId, newquantity }) => {
      try {
        const schema = joi
          .object()
          .keys({
            productId: joi.number().id(),
            newquantity: joi.number().min(0),
          })
          .required();
        const validation = schema.validate({ productId, newquantity });
        console.log(validation);
        if (validation.error) {
          return { errors: "error on your input values " };
        }
        var product = await findProductById(productId);
        console.log(productId);
        if (!product) return { errors: "can't find product !" };
        var product = await UpdateQuantityProduct(productId, newquantity);
        console.log(product);
        return { product };
      } catch (err) {
        new ApolloError("Failed to fetch product", err);
      }
    },
  },
};

export default productMutations;
