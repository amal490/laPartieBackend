import "@babel/polyfill";
import { PrismaClient, Validate } from "@prisma/client";
const prisma = new PrismaClient();

export function findProductFromCart(userId, productId) {
  const cart = prisma.cart.findFirst({
    where: {
      userId: userId,
      productId: productId,
    },
    include: {
      product: true,
    },
  });
  return cart;
}
export function findUserCart(userId) {
  const cartUser = prisma.cart.findMany({
    where: {
      userId: userId,
    },
    include: {
      product: true,
    },
  });
  return cartUser;
}
export function addProductAtCart(userId, productId, quantity) {
  const cart = prisma.cart.create({
    data: {
      userId: userId,
      productId: productId,
      quantity: quantity,
    },
    include: {
      product: true,
    },
  });
  return cart;
}
export function deleteProductFromCart(cartId) {
  const data = prisma.cart.delete({
    where: {
      cartId: cartId,
    },
  });
  return data;
}
export function deleteCartUser(userId) {
  const data = prisma.cart.deleteMany({
    where: {
      userId: userId,
    },
  });
  return data;
}
export function updateProductQuantityfromCart(cartId, quantity) {
  const cart = prisma.cart.update({
    where: {
      cartId: cartId,
    },
    data: {
      quantity: quantity,
    },
    include: {
      product: true,
    },
  });
  return cart;
}
export function updateSatatusCart(userId) {
  const cart = prisma.cart.updateMany({
    where: {
      userId: userId,
    },
    data: {
      validate: Validate.VALID,
    },
  });
  return cart;
}
