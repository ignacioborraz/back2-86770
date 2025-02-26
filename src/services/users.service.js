import User from "../data/models/users.model.js";

class UsersService {
  createUser = async (data) => {
    const response = await User.create(data);
    return response;
  };
  readAllUsers = async () => {
    const response = await User.find();
    return response;
  };
  readOneUser = async (pid) => {
    const response = await User.findById(pid);
    return response;
  };
  updateOneUser = async (pid, data) => {
    const opt = { new: true };
    const response = await User.findByIdAndUpdate(pid, data, opt);
    return response;
  };
  destroyOneUser = async (pid) => {
    const response = await User.findByIdAndDelete(pid);
    return response;
  };
}

const usersService = new UsersService();
export default usersService;
