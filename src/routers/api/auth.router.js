import CustomRouter from "../../utils/CustomRouter.util.js";
import { register, login, signout, online, google, failure, twilio, nodemailer, verify } from "../../controllers/auth.controller.js"
import passportCb from "../../middlewares/passportCb.mid.js";

class AuthRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.create("/signout", ["USER", "ADMIN"], signout);
    this.create("/online", ["USER", "ADMIN"], online);
    this.read("/google", ["PUBLIC"], passportCb("google"));
    this.read("/google/callback", ["PUBLIC"], passportCb("google"), google);
    this.read("/google/failure", ["PUBLIC"], failure);
    this.read("/twilio/:phone", ["PUBLIC"], twilio)
    this.read("/nodemailer/:email", ["PUBLIC"], nodemailer)
    this.create("/verify", ["PUBLIC"], verify)
  };
}

const authRouter = new AuthRouter();
export default authRouter.getRouter();
