import twilioUtil from "../utils/twilio.util.js";
import nodemailerUtil from "../utils/nodemailer.util.js";
import usersService from "../services/users.service.js";

const register = async (req, res) => {
  const user = req.user;
  res.json201(user);
};
const login = async (req, res) => {
  const { token, user } = req;
  const opts = { maxAge: 60 * 60 * 24 * 7 * 1000 };
  res.cookie("token", token, opts).json200(user, "Logged in");
};
const signout = (req, res) =>
  res.clearCookie("token").json200(null, "Signed out");
const online = (req, res) => res.json200(null, "It's online");
const google = async (req, res) => {
  const { token, user } = req;
  const opts = { maxAge: 60 * 60 * 24 * 7 * 1000 };
  res.cookie("token", token, opts).json200(user, "Logged in with google");
};
const failure = (req, res) => {
  return res.json401();
};
const twilio = async (req, res) => {
  const { phone } = req.params
  const text = "mensaje de prueba"
  await twilioUtil(text, phone)
  res.json200(null, "SMS sent!")
}
const nodemailer = async (req, res) => {
  const { email } = req.params
  await nodemailerUtil(email)
  res.json200(null, "Verify email sent!")
}
const verify = async (req, res)=> {
  const { email, code } = req.body
  const user = await usersService.verify(email, code)
  if (!user) {
    res.json401()
  } else {
    res.json200(null, "Account verified!")
  }
}

export { register, login, signout, online, google, failure, twilio, nodemailer, verify };
