import CustomRouter from "../utils/CustomRouter.util.js";
import productsRouter from "./api/products.router.js";
import usersRouter from "./api/users.router.js";
import authRouter from "./api/auth.router.js";
import cartsRouter from "./api/carts.router.js";

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.router.use("/products", productsRouter);
    this.router.use("/users", usersRouter);
    this.router.use("/auth", authRouter);
    this.router.use("/carts", cartsRouter);
  };
}

const router = new ApiRouter();
export default router.getRouter();
