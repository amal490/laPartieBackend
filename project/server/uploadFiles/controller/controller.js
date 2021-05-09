const uploadFile = require("../middeleware/upload");
const fs = require("fs");
require("dotenv").config();
const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      console.log("No file received");
      return res.send({
        success: false,
      });
    } else {
      console.log("file received");
      return res.send({
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Could not upload the file",
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + process.env.UPLOAD;
  console.log(process.env.UPLOAD);
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: req.baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};
module.exports = {
  upload,
  getListFiles,
};
