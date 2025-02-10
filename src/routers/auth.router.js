import { Router } from "express";
import isAuth from "../middlewares/isAuth.mid.js";
import passportCb from "../middlewares/passportCb.mid.js";

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
    const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
    return res
      .status(200)
      .cookie("token", token, opts)
      .json({ message: "Logged in", response: user });
  } catch (error) {
    next(error);
  }
};
const signout = (req, res, next) => {
  try {
    return res.status(200).clearCookie("token").json({ message: "Signed out" });
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
  //passport.authenticate("register", { session: false }),
  passportCb("register"),
  register
);
authRouter.post(
  "/login",
  //passport.authenticate("login", { session: false }),
  passportCb("login"),
  login
);
authRouter.post(
  "/signout",
  //passport.authenticate("jwt-auth", { session: false }),
  passportCb("jwt-auth"),
  signout
);
authRouter.post("/online", passportCb("jwt-auth"), online);
authRouter.get(
  "/google",
  /*   passport.authenticate("google", {
    scope: ["email", "profile"],
    failureRedirect: "/google/failure",
  }) */
  passportCb("google")
);
authRouter.get(
  "/google/callback",
  /*   passport.authenticate("google", {
    session: false,
    failureRedirect: "/google/failure",
  }), */
  passportCb("google"),
  google
);
authRouter.get("/google/failure", failure);

export default authRouter;
