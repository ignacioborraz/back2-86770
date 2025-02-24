import { Router } from "express";
import { createUser, readAllUser, readOneUser, updateOneUser, destroyOneUser } from "../controllers/users.controller.js"
import passportCb from "../middlewares/passportCb.mid.js";

const usersRouter = Router();

usersRouter.post("/", createUser);
usersRouter.get("/", readAllUser);
usersRouter.get("/:uid", readOneUser);
usersRouter.put(
  "/:uid",
  //passport.authenticate("jwt-auth", { session: false }),
  passportCb("jwt-auth"),
  updateOneUser
);
usersRouter.delete(
  "/:uid",
  //passport.authenticate("jwt-auth", { session: false }),
  passportCb("jwt-auth"),
  destroyOneUser
);

export default usersRouter;
