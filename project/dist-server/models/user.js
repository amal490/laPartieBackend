"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUserById = findUserById;
exports.findUserByEmail = findUserByEmail;
exports.findUserByEmailAndUsername = findUserByEmailAndUsername;
exports.findIdRoleByName = findIdRoleByName;
exports.findAllUsers = findAllUsers;
exports.createUserData = createUserData;
exports.deleteUserById = deleteUserById;
exports.updateStatus = updateStatus;
exports.updateVerificationCode = updateVerificationCode;
exports.updateUserPassword = updateUserPassword;
exports.sendVerficationCode = sendVerficationCode;
exports.isCodeCorrect = isCodeCorrect;

require("@babel/polyfill");

var _client = require("@prisma/client");

var nodemailer = _interopRequireWildcard(require("nodemailer"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var prisma = new _client.PrismaClient();

function findUserById(value) {
  var data = prisma.users.findUnique({
    where: {
      userId: value
    },
    include: {
      role: true,
      cart: true
    }
  });
  return data;
}

function findUserByEmail(value) {
  var data = prisma.users.findFirst({
    where: {
      email: value
    },
    include: {
      role: true
    }
  });
  return data;
}

function findUserByEmailAndUsername(valueUsername, valueEmail) {
  var data = prisma.users.findMany({
    where: {
      OR: [{
        username: valueUsername
      }, {
        email: valueEmail
      }]
    }
  });
  return data;
}

function findIdRoleByName(value) {
  var data = prisma.privilagies.findFirst({
    where: {
      role: value
    }
  });
  return data;
}

function findAllUsers() {
  var users = prisma.users.findMany({
    include: {
      role: true
    }
  });
  return users;
}

function createUserData(name, username, email, hashedpassword, roleId, code) {
  var user = prisma.users.create({
    data: {
      name: name,
      username: username,
      email: email,
      password: hashedpassword,
      roleId: roleId,
      code: code
    }
  });
  return user;
}

function deleteUserById(value) {
  var data = prisma.users.deleteMany({
    where: {
      userId: value
    }
  });
  return data;
}

function updateStatus(userid, status) {
  console.log(userid);
  var user = prisma.users.update({
    where: {
      userId: userid
    },
    data: {
      status: status
    }
  });
  return user;
}

function updateVerificationCode(userid, secretCode) {
  var user = prisma.users.update({
    where: {
      userId: userid
    },
    data: {
      code: secretCode
    }
  });
  return user;
}

function updateUserPassword(userid, password) {
  var user = prisma.users.update({
    where: {
      userId: userid
    },
    data: {
      password: password
    }
  });
  return user;
}

function sendVerficationCode(_x, _x2) {
  return _sendVerficationCode.apply(this, arguments);
}

function _sendVerficationCode() {
  _sendVerficationCode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, secretCode) {
    var testAccount, transporter, info;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return nodemailer.createTestAccount();

          case 2:
            testAccount = _context.sent;
            transporter = nodemailer.createTransport({
              host: "localhost",
              port: 25,
              secure: false,
              auth: {
                user: testAccount.user,
                pass: testAccount.pass
              }
            });
            _context.next = 6;
            return transporter.sendMail({
              from: '"title site web : <gosport@example.com>',
              to: " ".concat(email),
              subject: "Your Activation Code for YOUR COUNT",
              text: "This is your confirmation code ?",
              // plain text body
              html: "<b>This is your confirmation code:  ".concat(secretCode, "</b>") // html body,

            });

          case 6:
            info = _context.sent;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sendVerficationCode.apply(this, arguments);
}

function isCodeCorrect(userCode, code) {
  if (userCode != code) {
    return false;
  } else {
    return true;
  }
}