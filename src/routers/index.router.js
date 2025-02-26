import CustomRouter from "../utils/CustomRouter.util.js";
//import viewsRouter from "./views.router.js";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import authRouter from "./auth.router.js";
import cartsRouter from "./carts.router.js";

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    //this.router.use("/", viewsRouter);
    this.router.use("/products", productsRouter);
    this.router.use("/users", usersRouter);
    this.router.use("/auth", authRouter);
    this.router.use("/carts", cartsRouter);
  };
}

const router = new ApiRouter();
export default router.getRouter();
