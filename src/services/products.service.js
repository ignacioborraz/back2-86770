import Product from "../data/models/products.model.js";

class ProductsService {
  createProduct = async (data) => {
    const response = await Product.create(data);
    return response;
  };
  readAllProducts = async () => {
    const response = await Product.find();
    return response;
  };
  readOneProduct = async (pid) => {
    const response = await Product.findById(pid);
    return response;
  };
  updateOneProduct = async (pid, data) => {
    const opt = { new: true };
    const response = await Product.findByIdAndUpdate(pid, data, opt);
    return response;
  };
  destroyOneProduct = async (pid) => {
    const response = await Product.findByIdAndDelete(pid);
    return response;
  };
}

const productsService = new ProductsService();
export default productsService;
