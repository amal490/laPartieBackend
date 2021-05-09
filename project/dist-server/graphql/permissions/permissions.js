"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlShield = require("graphql-shield");

var _rules = require("./rules");

var permissions = (0, _graphqlShield.shield)({
  Mutation: {
    addCategory: (0, _graphqlShield.and)(_rules.isAdmin, _rules.isStatusActive)
  }
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
var _default = permissions;
exports["default"] = _default;