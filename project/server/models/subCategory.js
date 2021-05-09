import "@babel/polyfill";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export function findSubCategoryById(value) {
  const subCategory = prisma.subCategory.findUnique({
    where: {
      subCategoryId: value,
    },
    include: {
      category: true,
      products: true,
    },
  });
  return subCategory;
}
export function findSubCategoryByName(value) {
  const subCategory = prisma.subCategory.findFirst({
    where: {
      name: value,
    },
  });
  return subCategory;
}
export function getAllSubCategories() {
  const subCategory = prisma.subCategory.findMany({
    include: {
      category: true,
      products: true,
    },
  });
  return subCategory;
}
export function createSubCategory(name, categoryId) {
  const subCategory = prisma.subCategory.create({
    data: {
      name: name,
      categoryId: categoryId,
    },
    include: {
      category: true,
      products: true,
    },
  });
  return subCategory;
}
export function deleteSubCategoryById(value) {
  const subCategory = prisma.subCategory.delete({
    where: {
      subCategoryId: value,
    },
  });
  return subCategory;
}
export function deleteSubCategoryByCategoryId(value) {
  const subCategory = prisma.subCategory.deleteMany({
    where: {
      categoryId: value,
    },
  });
  return subCategory;
}
export function UpdateSubCategoryName(subCategoryId, newSousCategoryName) {
  const subCategory = prisma.subCategory.update({
    where: {
      subCategoryId: subCategoryId,
    },
    data: {
      name: newSousCategoryName,
    },
    include: {
      category: true,
    },
  });
  return subCategory;
}
