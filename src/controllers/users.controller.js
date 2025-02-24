import User from "../data/models/users.model.js";

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await User.create(data);
    return res.status(201).json({ message: "Created", response });
  } catch (error) {
    next(error);
  }
};
const readAllUser = async (req, res, next) => {
  try {
    const response = await User.find();
    return res.status(200).json({ message: "Read", response });
  } catch (error) {
    next(error);
  }
};
const readOneUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await User.findById(uid);
    return res.status(200).json({ message: "Read by id", response });
  } catch (error) {
    next(error);
  }
};
const updateOneUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const opt = { new: true };
    const response = await User.findByIdAndUpdate(uid, data, opt);
    return res.status(200).json({ message: "Updated", response });
  } catch (error) {
    next(error);
  }
};
const destroyOneUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await User.findByIdAndDelete(uid);
    return res.status(200).json({ message: "Deleted", response });
  } catch (error) {
    return next(error);
  }
};

export { createUser, readAllUser, readOneUser, updateOneUser, destroyOneUser };
