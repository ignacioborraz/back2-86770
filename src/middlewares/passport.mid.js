import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../data/models/users.model.js";
import { compareHash, createHash } from "../utils/hash.util.js";

passport.use(
  "register",
  new LocalStrategy(
    /* la configuración de la estrategia depende de QUE QUIERO HACER */
    /* en este caso quiero REGISTRAR */
    /* para construir una estrategia necesito configurar */
    /* objeto con opciones de configuracion y callback con la logica de la estrategia */
    {
      passReqToCallback: true,
      usernameField: "email" /* , passwordField: "contrasenia" */,
    },
    async (req, email, password, done) => {
      try {
        const one = await User.findOne({ email });
        if (one) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        req.body.password = createHash(password);
        const user = await User.create(req.body);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
          }
        const verifyPassword = compareHash(password, user.password);
        if (!verifyPassword) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        req.session.user_id = user._id;
        req.session.role = user.role;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
  /* la configuración de la estrategia depende de QUE QUIERO HACER */
  /* en este caso quiero INICIAR SESION */
);

export default passport;
