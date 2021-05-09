// app.js
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "../routes/index";
import usersRouter from "../routes/users";
const { verify } = require("jsonwebtoken");
var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
//app.use(express.static(__dirname + "/staticFiles"));
app.use((req, res, next) => {
  const accessToken = req.cookies["accessToken"];
  try {
    req.userId = null;
    if (accessToken) {
      //  console.log("accessToken", accessToken);
      const data = verify(accessToken, "token");
      if (data && data.userId) {
        req.userId = data.userId;
      }
      console.log("req", req.userId);
    }
  } catch {
    new Error("Error");
  }
  next();
});


export default app;
