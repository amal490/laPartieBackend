import "@babel/polyfill";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export function findCategoryById(value) {
  const category = prisma.category.findUnique({
    where: {
      categoryId: value,
    },
    include: {
      subCategory: true,
    },
  });
  return category;
}
export function findCategoryByName(value) {
  const category = prisma.category.findFirst({
    where: {
      name: value,
    },
    include: {
      subCategory: true,
    },
  });
  return category;
}

export function getAllCategories() {
  const category = prisma.category.findMany({
    include: {
      subCategory: true,
    },
  });
  return category;
}
export function createCategory(name) {
  const category = prisma.category.create({
    data: {
      name: name,
    },
  });
  return category;
}
export function deleteSubCategoryByCategoryId(value) {
  const subCategory = prisma.subCategory.deleteMany({
    where: {
      categoryId: value,
    },
  });
  return subCategory;
}
export function deleteCategoryById(value) {
  const category = prisma.category.delete({
    where: {
      categoryId: value,
    },
  });
  return category;
}
export function deleteCategoryAndSubCategory(subcategory,category) {
  const transaction = prisma.$transaction([subcategory,category ]);
  return transaction;
}
export function UpdateCategoryName(categoryId, newCategoryName) {
  const category = prisma.category.update({
    where: {
      categoryId: categoryId,
    },
    data: {
      name: newCategoryName,
    },
  });
  return category;
}
