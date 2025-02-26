import Cart from "../data/models/carts.model.js";

class CartsService {
  addProductToCart = async (data) => {
    const response = await Cart.create(data);
    return response;
  };
  readProductsFromUser = async (data) => {
    const response = await Cart.find(data);
    return response;
  };
  updateCart = async (cart_id, data) => {
    const opt = { new: true };
    const response = await Cart.findByIdAndUpdate(cart_id, data, opt);
    return response;
  };
  removeProductFromCart = async (cart_id) => {
    const response = await Cart.findByIdAndDelete(cart_id);
    return response;
  };
}

const cartsService = new CartsService();
export default cartsService;
