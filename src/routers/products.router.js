import CustomRouter from "../utils/CustomRouter.util.js";
import { createProduct, readAllProducts, readOneProduct, updateOneProduct, destroyOneProduct } from "../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createProduct);
    this.read("/", ["PUBLIC"], readAllProducts);
    this.read("/:pid", ["PUBLIC"], readOneProduct);
    this.update("/:pid", ["ADMIN"], updateOneProduct);
    this.destroy("/:pid", ["ADMIN"], destroyOneProduct);
  };
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
