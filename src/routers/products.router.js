import { Router } from "express";
import Product from "../data/models/products.model.js";
import isAdmin from "../middlewares/isAdmin.mid.js";

const productsRouter = Router();

productsRouter.post("/", isAdmin, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await Product.create(data);
    return res.status(201).json({ message: "Created", response });
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/", async (req, res, next) => {
  try {
    const response = await Product.find();
    return res.status(200).json({ message: "Read", response });
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await Product.findById(pid);
    return res.status(200).json({ message: "Read by id", response });
  } catch (error) {
    next(error);
  }
});
productsRouter.put("/:pid", isAdmin, async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const opt = { new: true };
    const response = await Product.findByIdAndUpdate(pid, data, opt);
    return res.status(200).json({ message: "Updated", response });
  } catch (error) {
    next(error);
  }
});
productsRouter.delete("/:pid", isAdmin, async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await Product.findByIdAndDelete(pid);
    return res.status(200).json({ message: "Deleted", response });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
