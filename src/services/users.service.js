//import { usersManager } from "../data/mongo/manager.mongo.js";
//import { usersManager } from "../data/fs/manager.fs.js";
//import { usersManager } from "../data/memory/manager.memory.js";
import { usersManager } from "../data/dao.js";

class UsersService {
  createUser = async (data) => await usersManager.create(data);
  readAllUsers = async () => await usersManager.read();
  readOneUser = async (uid) => await usersManager.readById(uid);
  updateOneUser = async (uid, data) => await usersManager.updateById(uid, data);
  destroyOneUser = async (uid) => await usersManager.destroyById(uid);
}

const usersService = new UsersService();
export default usersService;
