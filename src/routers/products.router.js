import { Router } from "express";
import Product from "../data/models/products.model.js";
import passportCb from "../middlewares/passportCb.mid.js";

const productsRouter = Router();

const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    data.owner_id = req.user._id
    const response = await Product.create(data);
    return res.status(201).json({ message: "Created", response });
  } catch (error) {
    next(error);
  }
};
const readAllProducts = async (req, res, next) => {
  try {
    const response = await Product.find();
    return res.status(200).json({ message: "Read", response });
  } catch (error) {
    next(error);
  }
};
const readOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await Product.findById(pid);
    return res.status(200).json({ message: "Read by id", response });
  } catch (error) {
    next(error);
  }
};
const updateOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const opt = { new: true };
    const response = await Product.findByIdAndUpdate(pid, data, opt);
    return res.status(200).json({ message: "Updated", response });
  } catch (error) {
    next(error);
  }
};
const destroyOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await Product.findByIdAndDelete(pid);
    return res.status(200).json({ message: "Deleted", response });
  } catch (error) {
    return next(error);
  }
};
productsRouter.post(
  "/",
  //passport.authenticate("jwt-adm", { session: false }),
  passportCb("jwt-adm"),

  createProduct
);
productsRouter.get("/", readAllProducts);
productsRouter.get("/:pid", readOneProduct);
productsRouter.put(
  "/:pid",
  //passport.authenticate("jwt-adm", { session: false }),
  passportCb("jwt-adm"),
  updateOneProduct
);
productsRouter.delete(
  "/:pid",
  //passport.authenticate("jwt-adm", { session: false }),
  passportCb("jwt-adm"),
  destroyOneProduct
);

export default productsRouter;
