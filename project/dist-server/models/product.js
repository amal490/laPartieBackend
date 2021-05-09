"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findProductByCode = findProductByCode;
exports.getRelatedProducts = getRelatedProducts;
exports.findProductById = findProductById;
exports.getAllProducts = getAllProducts;
exports.createProduct = createProduct;
exports.createImage = createImage;
exports.deleteProductById = deleteProductById;
exports.deleteProductsBySubCategoryId = deleteProductsBySubCategoryId;
exports.deleteProductDefaultImage = deleteProductDefaultImage;
exports.deleteProductImages = deleteProductImages;
exports.deleteAllProductImages = deleteAllProductImages;
exports.UpdateQuantityProduct = UpdateQuantityProduct;

require("@babel/polyfill");

var _client = require("@prisma/client");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var prisma = new _client.PrismaClient();

function findProductByCode(value) {
  var product = prisma.product.findFirst({
    where: {
      codeProd: value
    },
    include: {
      subCategory: true,
      defaultImage: true,
      images: true
    }
  });
  return product;
}

function getRelatedProducts(subCategoryId) {
  var products = prisma.product.findMany({
    take: 10,
    where: {
      subCategoryId: subCategoryId
    }
  });
  return products;
}

function findProductById(value) {
  var product = prisma.product.findUnique({
    where: {
      productId: value
    },
    include: {
      subCategory: true,
      defaultImage: true,
      images: true
    }
  });
  return product;
}

function getAllProducts() {
  var product = prisma.product.findMany({
    include: {
      subCategory: true,
      defaultImage: true,
      images: true
    }
  });
  return product;
}

function createProduct(name, price, rating, description, codeProd, quantity, subCategoryId, defaultImage) {
  var product = prisma.product.create({
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
          url: defaultImage
        }
      }
    }
  });
  return product;
}

function createImage(_x, _x2) {
  return _createImage.apply(this, arguments);
}

function _createImage() {
  _createImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, id) {
    var images;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return prisma.images.create({
              data: {
                url: name,
                productIdForImages: id
              }
            });

          case 2:
            images = _context.sent;
            return _context.abrupt("return", images);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createImage.apply(this, arguments);
}

function deleteProductById(value) {
  var product = prisma.product["delete"]({
    where: {
      productId: value
    }
  });
  return product;
}

function deleteProductsBySubCategoryId(value) {
  var product = prisma.product.deleteMany({
    where: {
      subCategoryId: value
    }
  });
  return product;
}

function deleteProductDefaultImage(value) {
  var defaultImage = prisma.defaultImage["delete"]({
    where: {
      defaultImageId: value
    }
  });
  return defaultImage;
}

function deleteProductImages(value) {
  var images = prisma.images.deleteMany({
    where: {
      productIdForImages: value
    }
  });
  return images;
}

function deleteAllProductImages(defaultImage, images) {
  var transaction = prisma.$transaction([defaultImage, images]);
  return transaction;
}

function UpdateQuantityProduct(productId, newquantity) {
  var product = prisma.product.update({
    where: {
      productId: productId
    },
    data: {
      quantity: newquantity
    },
    include: {
      subCategory: true
    }
  });
  return product;
}