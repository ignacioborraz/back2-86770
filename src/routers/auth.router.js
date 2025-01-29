import { Router } from "express";
import User from "../data/models/users.model.js";

const authRouter = Router();

const register =  async (req, res, next) => {
  try {
    // 1. obtengo los datos del objeto de requerimiento
    const { email, password } = req.body;
    // 2. verifico los datos obligatorio
    if (!email || !password) {
      const error = new Error("Invalid data");
      error.statusCode = 401;
      throw error;
    }
    // 3. verifico si el usuario ya está registrado
    const one = await User.findOne({ email });
    if (one) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    const user = await User.create(req.body);
    return res.status(201).json({ message: "Registered", response: user });
  } catch (error) {
    next(error);
  }
}
const login = async (req, res, next) => {
  try {
    // 1. obtener los datos
    const { email, password } = req.body;
    // 2. verificar la contraseña con los datos de la base de datos (mongo)
    const user = await User.findOne({ email });
    if (password !== user.password) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    // 3. guardar datos de la session
    req.session.user_id = user._id;
    req.session.role = user.role;
    // 4. enviar respuesta de exito al cliente
    return res.status(200).json({ message: "Logged in" });
  } catch (error) {
    next(error);
  }
}
const signout = (req, res, next) => {
  try {
    req.session.destroy();
    return res.status(200).json({ message: "Signed out" });
  } catch (error) {
    next(error);
  }
}
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
}
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/signout", signout);
authRouter.post("/online", online);

export default authRouter;
