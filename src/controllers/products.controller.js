import productsService from "../services/products.service.js";

const createProduct = async (req, res) => {
  const data = req.body;
  const { _id } = req.user;
  data.owner_id = _id;
  const response = await productsService.createProduct(data);
  res.json201(response);
};
const readAllProducts = async (req, res) => {
  const response = await productsService.readAllProducts();
  res.json200(response);
};
const readOneProduct = async (req, res) => {
  const { product_id } = req.params;
  const response = await productsService.readOneProduct(product_id);
  if (!response) {
    res.json404();
  } else {
    res.json200(response);
  }
};
const updateOneProduct = async (req, res) => {
  const { product_id } = req.params;
  const data = req.body;
  const response = await productsService.updateOneProduct(product_id, data);
  if (!response) {
    res.json404();
  } else {
    res.json200(response);
  }
};
const destroyOneProduct = async (req, res) => {
  const { product_id } = req.params;
  const response = await productsService.destroyOneProduct(product_id);
  if (!response) {
    res.json404();
  } else {
    res.json200(response);
  }
};

export { createProduct, readAllProducts, readOneProduct, updateOneProduct, destroyOneProduct };
