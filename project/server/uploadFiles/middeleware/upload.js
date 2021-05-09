const util = require("util");
const multer = require("multer");
const uuid4 = require("uuid").v4;
const path = require("path");

require("dotenv").config();
//const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + process.env.UPLOAD);
  },
  filename: (req, file, cb) => {
    const fullName =
      uuid4().replace(/-/g, "") + path.extname(file.originalname);
    cb(null, fullName);
  },
});
let uploadFile = multer({
  storage: storage,
  //limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
