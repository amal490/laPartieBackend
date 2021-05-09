import "@babel/polyfill";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export function findProductByCode(value) {
  const product = prisma.product.findFirst({
    where: {
      codeProd: value,
    },
    include: {
      subCategory: true,
      defaultImage: true,
      images: true,
    },
  });
  return product;
}
export function getRelatedProducts(subCategoryId) {
  const products = prisma.product.findMany({
    take: 10,
    where: {
      subCategoryId: subCategoryId,
    },
  });
  return products;
}
export function findProductById(value) {
  const product = prisma.product.findUnique({
    where: {
      productId: value,
    },
    include: {
      subCategory: true,
      defaultImage: true,
      images: true,
    },
  });
  return product;
}
export function getAllProducts() {
  const product = prisma.product.findMany({
    include: {
      subCategory: true,
      defaultImage: true,
      images: true,
    },
  });
  return product;
}
export function createProduct(
  name,
  price,
  rating,
  description,
  codeProd,
  quantity,
  subCategoryId,
  defaultImage
) {
  const product = prisma.product.create({
    data: {
      name: name,
      price: price,
      rating: rating,
      description: description,
      codeProd: codeProd,
      quantity: quantity,
      subCategoryId: subCategoryId,
      defaultImage: {
        create: {
          url: defaultImage,
        },
      },
    },
  });
  return product;
}
export async function createImage(name, id) {
  const images = await prisma.images.create({
    data: {
      url: name,
      productIdForImages: id,
    },
  });
  return images;
}

export function deleteProductById(value) {
  const product = prisma.product.delete({
    where: {
      productId: value,
    },
  });
  return product;
}
export function deleteProductsBySubCategoryId(value) {
  const product = prisma.product.deleteMany({
    where: {
      subCategoryId: value,
    },
  });
  return product;
}
export function deleteProductDefaultImage(value) {
  const defaultImage = prisma.defaultImage.delete({
    where: {
      defaultImageId: value,
    },
  });
  return defaultImage;
}

export function deleteProductImages(value) {
  const images = prisma.images.deleteMany({
    where: {
      productIdForImages: value,
    },
  });
  return images;
}
export function deleteAllProductImages(defaultImage, images) {
  const transaction = prisma.$transaction([defaultImage, images]);
  return transaction;
}
export function UpdateQuantityProduct(productId, newquantity) {
  const product = prisma.product.update({
    where: {
      productId: productId,
    },
    data: {
      quantity: newquantity,
    },
    include: {
      subCategory: true,
    },
  });
  return product;
}
