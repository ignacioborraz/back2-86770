import { usersManager } from "../dao/index.dao.js";
import UserDto from "../dto/users.dto.js";

class UsersService {
  create = async (data) => await usersManager.create(new UserDto(data));
  read = async (data) => await usersManager.read(data);
  readById = async (id) => await usersManager.readById(id);
  updateById = async (id, data) => await usersManager.updateById(id, data);
  destroyById = async (id) => await usersManager.destroyById(id);
}

const usersService = new UsersService();
export default usersService;
