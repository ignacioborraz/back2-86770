import { Router } from "express";
import productsManager from "../data/products.mongo.js";
import usersManager from "../data/users.mongo.js";
import cartsManager from "../data/carts.mongo.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
  try {
    const products = await productsManager.read();
    return res.status(200).render("index", { products, title: "HOME" });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
});
viewsRouter.get("/login", async (req, res) => {
  try {
    return res.status(200).render("login", { title: "LOGIN" });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
});
viewsRouter.get("/register", async (req, res) => {
  try {
    return res.status(200).render("register", { title: "REGISTER" });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
});
viewsRouter.get("/profile/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const profile = await usersManager.readById(user_id);
    return res.status(200).render("profile", { title: "PROFILE", profile });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
});
viewsRouter.get("/product/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await productsManager.readById(product_id);
    return res
      .status(200)
      .render("product", { title: product.title.toUpperCase(), product });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
});
viewsRouter.get("/cart/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const carts = await cartsManager.readProductsFromUser(user_id);
    const total = await cartsManager.totalToPay(user_id);
    return res.status(200).render("cart", { title: "CART", carts, total: total[0].total });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
});

export default viewsRouter;
