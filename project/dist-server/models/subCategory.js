"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findSubCategoryById = findSubCategoryById;
exports.findSubCategoryByName = findSubCategoryByName;
exports.getAllSubCategories = getAllSubCategories;
exports.createSubCategory = createSubCategory;
exports.deleteSubCategoryById = deleteSubCategoryById;
exports.deleteSubCategoryByCategoryId = deleteSubCategoryByCategoryId;
exports.UpdateSubCategoryName = UpdateSubCategoryName;

require("@babel/polyfill");

var _client = require("@prisma/client");

var prisma = new _client.PrismaClient();

function findSubCategoryById(value) {
  var subCategory = prisma.subCategory.findUnique({
    where: {
      subCategoryId: value
    },
    include: {
      category: true,
      products: true
    }
  });
  return subCategory;
}

function findSubCategoryByName(value) {
  var subCategory = prisma.subCategory.findFirst({
    where: {
      name: value
    }
  });
  return subCategory;
}

function getAllSubCategories() {
  var subCategory = prisma.subCategory.findMany({
    include: {
      category: true,
      products: true
    }
  });
  return subCategory;
}

function createSubCategory(name, categoryId) {
  var subCategory = prisma.subCategory.create({
    data: {
      name: name,
      categoryId: categoryId
    },
    include: {
      category: true,
      products: true
    }
  });
  return subCategory;
}

function deleteSubCategoryById(value) {
  var subCategory = prisma.subCategory["delete"]({
    where: {
      subCategoryId: value
    }
  });
  return subCategory;
}

function deleteSubCategoryByCategoryId(value) {
  var subCategory = prisma.subCategory.deleteMany({
    where: {
      categoryId: value
    }
  });
  return subCategory;
}

function UpdateSubCategoryName(subCategoryId, newSousCategoryName) {
  var subCategory = prisma.subCategory.update({
    where: {
      subCategoryId: subCategoryId
    },
    data: {
      name: newSousCategoryName
    },
    include: {
      category: true
    }
  });
  return subCategory;
}