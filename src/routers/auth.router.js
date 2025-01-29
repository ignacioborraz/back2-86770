import { Router } from "express";
import passport from "../middlewares/passport.mid.js";

const authRouter = Router();

const register = async (req, res, next) => {
  try {
    /* la callback done si todo está bien, agrega al objeto de requerimientos los datos del usuario CREADO (en este caso) */
    const user = req.user;
    return res.status(201).json({ message: "Registered", response: user });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    /* la callback done si todo está bien, agrega al objeto de requerimientos los datos del usuario CREADO (en este caso) */
    const user = req.user;
    return res.status(200).json({ message: "Logged in", response: user });
  } catch (error) {
    next(error);
  }
};
const signout = (req, res, next) => {
  try {
    req.session.destroy();
    return res.status(200).json({ message: "Signed out" });
  } catch (error) {
    next(error);
  }
};
const online = (req, res, next) => {
  try {
    console.log(req.session);
    // 1. obtener los datos de la cookie de session
    const { user_id } = req.session;
    // 2. verificar si existe
    // 3. en caso que si, devuelvo algo, en caso que no, construyo el error
    if (!user_id) {
      const error = new Error("It's not online");
      error.statusCode = 401;
      throw error;
    }
    return res.status(200).json({ message: "It's online", response: true });
  } catch (error) {
    next(error);
  }
};

authRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
  register
);
authRouter.post(
  "/login",
  passport.authenticate("login", { session: false }),
  login
);
authRouter.post("/signout", signout);
authRouter.post("/online", online);

export default authRouter;
