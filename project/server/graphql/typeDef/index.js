import { mergeTypeDefs } from "@graphql-tools/merge";
import cartTypeDef from "./cartTypeDef";
import categoryTypeDef from "./categoryTypeDef";
import productTypeDef from "./productTypeDef";
import subCategoryTypeDef from "./subCategoryTypeDef";
import userTypeDef from "./userTypeDef";
const types = [
  productTypeDef,
  userTypeDef,
  categoryTypeDef,
  subCategoryTypeDef,
  cartTypeDef,
];

export default mergeTypeDefs(types);
