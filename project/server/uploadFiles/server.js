const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();
global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

const initRoutes = require("./routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = process.env.PORT_UPLOAD;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
