import express from "express";
const router = express.Router();
import {
  upload,
  getListFiles,
  download,
} from "../uploadFiles/controller/controller";
let routes = (appApi) => {
  router.post("/upload", upload);
  router.get("/files", getListFiles);
  router.get("/files/:name", download);

  app.use(appApi);
};

export default routes;
