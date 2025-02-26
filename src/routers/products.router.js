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
    this.read("/:product_id", ["PUBLIC"], readOneProduct);
    this.update("/:product_id", ["ADMIN"], updateOneProduct);
    this.destroy("/:product_id", ["ADMIN"], destroyOneProduct);
  };
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
