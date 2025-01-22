import { Router } from "express";
import User from "../data/models/users.model.js";

const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
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
});
authRouter.post("/signout", (req, res, next) => {
  try {
    req.session.destroy();
    return res.status(200).json({ message: "Signed out" });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
