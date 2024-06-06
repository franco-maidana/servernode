import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
//import { Strategy as GoogleStrategy } from "passport-google-oauth2";
//import { Strategy as GithubStrategy } from "passport-github2";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
// import Usuarios from "../data/mongo/users.mongo.js";
import UsuarioRepositorio from "../repositories/users.repositories.js";
import errors from "../utils/errors/error.js";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      let one = await UsuarioRepositorio.readByEmail(email);
      if (one) {
        // si existe el usuario deja pasar
        return done(null, false, errors.existsPass);
      } else {
        // si no existe el usuario lo crea
        const user = await UsuarioRepositorio.create(req.body);
        return done(null, user);
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
        const user = await UsuarioRepositorio.readByEmail(email);
        const verify = verifyHash(password, user.password);
        if (user?.verified && verify) {
          const token = createToken({ email, role: user.role });
          req.token = token;
          // si existe el usuario
          return done(null, user);
        } else {
          // si no existe el usuario
          return done(null, false, errors.badAuth);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      // obtiene el token de la solicitud fromExtractos es por cokies
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: process.env.SECRET,
    },
    async (payload, done) => {
      try {
        // payload => resultado de los datos tokenizados
        const user = await UsuarioRepositorio.readByEmail(payload.email);
        if (user) {
          user.password = null;
          // si existe el usuario
          return done(null, user);
        } else {
          // si no existe el usuario
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
