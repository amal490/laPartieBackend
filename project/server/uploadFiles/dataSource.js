const { RESTDataSource } = require("apollo-datasource-rest");
const FormData = require("form-data");
require("dotenv").config();
class MyDatasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.URL_UPLOAD;
  }
  async postFileToServer({ str }) {
    // const inMemoryFile = Buffer.from(str, "utf-8");
    //const myForm = new FormData();
    //myForm.append("file", inMemoryFile, "file.txt");
    const url = process.env.URL_UPLOAD;
    return this.post(url); //, myForm);
  }
}

module.exports = { MyDatasource };
