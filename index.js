import "./src/utils/env.util.js";
import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import __dirname from "./utils.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import argsUtil from "./src/utils/args.util.js";

/* server */
const server = express();
const port = argsUtil.p;
const ready = async () => console.log("server is ready on port " + port);
server.listen(port, ready);

/* engine settings */
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

/* middlewares */
//const FileStore = fileStore(session);
server.use(morgan("dev"));
server.use(cookieParser(process.env.COOKIE_KEY));
server.use(cors({ origin: true, credentials: true }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

/* routers settings */
server.use("/api", router);
server.use(errorHandler);
server.use(pathHandler);
