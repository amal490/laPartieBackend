import { shield, and, not } from "graphql-shield";
import { isAdmin, isClient, isAuthenticated, isStatusActive } from "./rules";
const permissions = shield({
  Mutation: {
    addCategory: and(isAdmin, isStatusActive),
  },
  /*     
    updateCategory 
    addSubCategory,
    deleteSubCategory,
    updateSubCategory,
    addProduct,
    deleteUserById,
    updateQuantityProduct,
    deleteProductByID
    logout,
    register,
    verifyMailForRegister,
    verifyMailForRestPassword,
    resetPassword,
    updateUser,
    addToCart,
    removeProductFromCart,
    updateProductQuantityfromCart,
    removeCart
  Query: {
    getAllUsers: isAdmin,
  },
  */
});
export default permissions;
