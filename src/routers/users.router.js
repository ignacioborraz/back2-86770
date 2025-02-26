import CustomRouter from "../utils/CustomRouter.util.js";
import { createUser, readAllUsers, readOneUser, updateOneUser, destroyOneUser } from "../controllers/users.controller.js";
import passportCb from "../middlewares/passportCb.mid.js";

class UsersRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["PUBLIC"], createUser);
    this.read("/", ["ADMIN"], readAllUsers);
    this.read("/:user_id", ["USER", "ADMIN"], readOneUser);
    this.update("/:user_id", ["USER", "ADMIN"], passportCb("jwt-auth"), updateOneUser);
    this.destroy("/:user_id", ["USER", "ADMIN"], passportCb("jwt-auth"), destroyOneUser);
  };
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
