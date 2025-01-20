import { Router } from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/users", usersRouter);

export default router;
