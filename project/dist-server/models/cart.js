"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findProductFromCart = findProductFromCart;
exports.findUserCart = findUserCart;
exports.addProductAtCart = addProductAtCart;
exports.deleteProductFromCart = deleteProductFromCart;
exports.deleteCartUser = deleteCartUser;
exports.updateProductQuantityfromCart = updateProductQuantityfromCart;
exports.updateSatatusCart = updateSatatusCart;

require("@babel/polyfill");

var _client = require("@prisma/client");

var prisma = new _client.PrismaClient();

function findProductFromCart(userId, productId) {
  var cart = prisma.cart.findFirst({
    where: {
      userId: userId,
      productId: productId
    },
    include: {
      product: true
    }
  });
  return cart;
}

function findUserCart(userId) {
  var cartUser = prisma.cart.findMany({
    where: {
      userId: userId
    },
    include: {
      product: true
    }
  });
  return cartUser;
}

function addProductAtCart(userId, productId, quantity) {
  var cart = prisma.cart.create({
    data: {
      userId: userId,
      productId: productId,
      quantity: quantity
    },
    include: {
      product: true
    }
  });
  return cart;
}

function deleteProductFromCart(cartId) {
  var data = prisma.cart["delete"]({
    where: {
      cartId: cartId
    }
  });
  return data;
}

function deleteCartUser(userId) {
  var data = prisma.cart.deleteMany({
    where: {
      userId: userId
    }
  });
  return data;
}

function updateProductQuantityfromCart(cartId, quantity) {
  var cart = prisma.cart.update({
    where: {
      cartId: cartId
    },
    data: {
      quantity: quantity
    },
    include: {
      product: true
    }
  });
  return cart;
}

function updateSatatusCart(userId) {
  var cart = prisma.cart.updateMany({
    where: {
      userId: userId
    },
    data: {
      validate: _client.Validate.VALID
    }
  });
  return cart;
}