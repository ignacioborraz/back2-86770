import { Router } from "express";
import passport from "../middlewares/passport.mid.js";
import isAuth from "../middlewares/isAuth.mid.js";

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
    const { token, user } = req;
    return res.status(200).json({ message: "Logged in", response: { token, user } });
  } catch (error) {
    next(error);
  }
};
const signout = (req, res, next) => {
  try {
    return res.status(200).json({ message: "Signed out" });
  } catch (error) {
    next(error);
  }
};
const online = (req, res, next) => {
  try {
    return res.status(200).json({ message: "It's online", response: true });
  } catch (error) {
    next(error);
  }
};
const google = async (req, res, next) => {
  try {
    const { token, user } = req;
    return res
      .status(200)
      .json({ message: "Logged in with Google", response: { token, user } });
  } catch (error) {
    next(error);
  }
};
const failure = (req, res) => {
  return res.status(401).json({ message: "Google Error" });
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
authRouter.post("/online", isAuth, online);
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    failureRedirect: "/google/failure",
  })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/google/failure",
  }),
  google
);
authRouter.get("/google/failure", failure);

export default authRouter;
