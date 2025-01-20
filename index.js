import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import dbConnect from "./src/utils/dbConnect.util.js";

/* server */
const server = express();
const port = 8080;
const ready = async () => {
  console.log("server is ready on port " + port);
  await dbConnect();
  console.log("mongo connected");
};
server.listen(port, ready);

/* middlewares */
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use("/api/", router);
server.use(errorHandler);
server.use(pathHandler);
