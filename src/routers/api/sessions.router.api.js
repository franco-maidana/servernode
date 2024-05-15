import { Router } from "express";
// import { Usuarios } from "../../data/mongo/manager.model.js"; // me lo traigo para la creacion de usuario
import has8char from "../../middlewares/has8char.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.js";

const sessionsRouter = Router();

// register
sessionsRouter.post(
  "/register",
  has8char,
  passCallBack("register"),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//login
sessionsRouter.post("/login", passCallBack("login"), async (req, res, next) => {
  try {
    req.login(req.user, function (err) {
      if (err) {
        return next(err);
      }
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in!",
        });
    });
  } catch (error) {
    return next(error);
  }
});

//google
// con get anda
sessionsRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
// google Callback
sessionsRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res, next) => {
    try {
      return res.json({
        session: req.session,
        message: "Logged in with Google",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//git-hub
// con get anda
sessionsRouter.post(
  "/github",
  passport.authenticate("github", { scope: ["email", "profile"] })
);
// gitHub-callback
sessionsRouter.get(
  "/github/callback",
  passport.authenticate("github"),
  (req, res, next) => {
    try {
      return res.json({
        session: req.session,
        message: "Logged in with Github",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//me
sessionsRouter.post("/", async (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: "Session with email: " + req.session.email,
      });
    } else {
      const error = new Error("No Auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

//signout
sessionsRouter.post(
  "/signout",
  // passport.authenticate("jwt", {
  //   session: false,
  //   failureRedirect: "/api/session/signout/cb",
  // }),
  passCallBack("jwt"),
  async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

// bad-auth
sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

//signout/cb

sessionsRouter.get("/signout/cb", (req, res, next) => {
  try {
    return res.json({
      statusCode: 400,
      message: "Al ready done",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
