"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findCategoryById = findCategoryById;
exports.findCategoryByName = findCategoryByName;
exports.getAllCategories = getAllCategories;
exports.createCategory = createCategory;
exports.deleteSubCategoryByCategoryId = deleteSubCategoryByCategoryId;
exports.deleteCategoryById = deleteCategoryById;
exports.deleteCategoryAndSubCategory = deleteCategoryAndSubCategory;
exports.UpdateCategoryName = UpdateCategoryName;

require("@babel/polyfill");

var _client = require("@prisma/client");

var prisma = new _client.PrismaClient();

function findCategoryById(value) {
  var category = prisma.category.findUnique({
    where: {
      categoryId: value
    },
    include: {
      subCategory: true
    }
  });
  return category;
}

function findCategoryByName(value) {
  var category = prisma.category.findFirst({
    where: {
      name: value
    },
    include: {
      subCategory: true
    }
  });
  return category;
}

function getAllCategories() {
  var category = prisma.category.findMany({
    include: {
      subCategory: true
    }
  });
  return category;
}

function createCategory(name) {
  var category = prisma.category.create({
    data: {
      name: name
    }
  });
  return category;
}

function deleteSubCategoryByCategoryId(value) {
  var subCategory = prisma.subCategory.deleteMany({
    where: {
      categoryId: value
    }
  });
  return subCategory;
}

function deleteCategoryById(value) {
  var category = prisma.category["delete"]({
    where: {
      categoryId: value
    }
  });
  return category;
}

function deleteCategoryAndSubCategory(subcategory, category) {
  var transaction = prisma.$transaction([subcategory, category]);
  return transaction;
}

function UpdateCategoryName(categoryId, newCategoryName) {
  var category = prisma.category.update({
    where: {
      categoryId: categoryId
    },
    data: {
      name: newCategoryName
    }
  });
  return category;
}