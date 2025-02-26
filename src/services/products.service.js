//import { productsManager } from "../data/mongo/manager.mongo.js";
//import { productsManager } from "../data/fs/manager.fs.js";
//import { productsManager } from "../data/memory/manager.memory.js";
import { productsManager } from "../data/dao.js";
import ProductDto from "../data/dto/product.dto.js";

class ProductsService {
  createProduct = async (data) => await productsManager.create(dataDto);
  readAllProducts = async () => await productsManager.read();
  readOneProduct = async (pid) => await productsManager.readById(pid);
  updateOneProduct = async (pid, data) => await productsManager.updateById(pid, data);
  destroyOneProduct = async (pid) => await productsManager.destroyById(pid);
}

const productsService = new ProductsService();
export default productsService;
