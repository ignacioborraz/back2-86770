import { Router } from "express";

const productsRouter = Router();

productsRouter.post("/", (req, res, next) => {
  try {
    const response = {};
    // response debe ser la respuesta de mongo del producto recien creado
    return res.status(201).json({ message: "Created", response });
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/", (req, res, next) => {
  try {
    const response = [];
    // response debe ser la respuesta de mongo de leer todos los productos
    return res.status(200).json({ message: "Read", response });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
