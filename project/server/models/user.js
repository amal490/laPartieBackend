import "@babel/polyfill";
import { PrismaClient, Role, Status } from "@prisma/client";
import "@babel/polyfill";
const prisma = new PrismaClient();
import * as nodemailer from "nodemailer";
export function findUserById(value) {
  const data = prisma.users.findUnique({
    where: {
      userId: value,
    },
    include: {
      role: true,
      cart: true,
    },
  });
  return data;
}
export function findUserByEmail(value) {
  const data = prisma.users.findFirst({
    where: {
      email: value,
    },
    include: {
      role: true,
    },
  });
  return data;
}
export function findUserByEmailAndUsername(valueUsername, valueEmail) {
  const data = prisma.users.findMany({
    where: {
      OR: [{ username: valueUsername }, { email: valueEmail }],
    },
  });
  return data;
}
export function findIdRoleByName(value) {
  const data = prisma.privilagies.findFirst({
    where: {
      role: value,
    },
  });
  return data;
}
export function findAllUsers() {
  const users = prisma.users.findMany({
    include: { role: true },
  });
  return users;
}
export function createUserData(
  name,
  username,
  email,
  hashedpassword,
  roleId,
  code
) {
  const user = prisma.users.create({
    data: {
      name: name,
      username: username,
      email: email,
      password: hashedpassword,
      roleId: roleId,
      code: code,
    },
  });
  return user;
}
export function deleteUserById(value) {
  const data = prisma.users.deleteMany({
    where: {
      userId: value,
    },
  });
  return data;
}

export function updateStatus(userid, status) {
  console.log(userid);
  const user = prisma.users.update({
    where: {
      userId: userid,
    },
    data: {
      status: status,
    },
  });
  return user;
}
export function updateVerificationCode(userid, secretCode) {
  const user = prisma.users.update({
    where: {
      userId: userid,
    },
    data: {
      code: secretCode,
    },
  });
  return user;
}
export function updateUserPassword(userid, password) {
  const user = prisma.users.update({
    where: {
      userId: userid,
    },
    data: {
      password: password,
    },
  });
  return user;
}
export async function sendVerficationCode(email, secretCode) {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 25,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  const info = await transporter.sendMail({
    from: '"title site web : <gosport@example.com>',
    to: ` ${email}`,
    subject: "Your Activation Code for YOUR COUNT",
    text: "This is your confirmation code ?", // plain text body
    html: `<b>This is your confirmation code:  ${secretCode}</b>`, // html body,
  });
}
export function isCodeCorrect(userCode, code) {
  if (userCode != code) {
    return false;
  } else {
    return true;
  }
}
