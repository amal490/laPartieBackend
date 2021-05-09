/*import path from "path";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
const resolversArray = loadFilesSync(path.join(__dirname, './*'), { extensions: ['js'] },{ recursive: true });
 export default  mergeResolvers(resolversArray);*/
import { mergeResolvers } from "@graphql-tools/merge";
import productMutations from "./mutations/productMutations";
import subCategoryMutations from "./mutations/subCategoryMutations";
import userMutations from "./mutations/userMutations";
import productQuery from "./queries/productQuery";
import userQueries from "./queries/userQuery";
import subCategoryQuery from "./queries/subCategoryQuery";
import categoryQuery from "./queries/categoryQuery";
import categoryMutation from "./mutations/categoryMutation";
import cartMutations from "./mutations/cartMutations";
import cartQueries from "./queries/cartQuery";

const resolvers = [
  userMutations,
  productQuery,
  userQueries,
  productMutations,
  subCategoryMutations,
  subCategoryQuery,
  categoryQuery,
  categoryMutation,
  cartMutations,
  cartQueries,
];

export default mergeResolvers(resolvers);
