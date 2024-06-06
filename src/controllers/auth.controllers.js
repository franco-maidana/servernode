import service from "../services/user.service.js";

class AuthControllers {
  constructor() {
    this.service = service;
  }

  register = async (req, res, next) => {
    try {
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });      
    } catch (error) {
      return next(error);
    }
  };
  login = async (req, res, next) => {
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
            sessions: req.user,
          });
      });
    } catch (error) {
      return next(error);
    }
  };
  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out!",
      });
    } catch (error) {
      return next(error);
    }
  };
  me = async (req, res, next) => {
    try {
      if (req.user.email) {
        return res.json({
          statusCode: 200,
          message: "Session with email: " + req.user.email,
        });
      } else {
        const error = new Error("No Auth");
        error.statusCode = 400;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  };
  verifyAccount = async (req, res, next) => {
    try {
      const { email, verifiedCode } = req.body;
      const user = await service.readByEmail(email);
      if (user.verifiedCode === verifiedCode) {
        await service.update(user._id, { verified: true });
        return res.json({
          statusCode: 200,
          message: "Verified user!",
        });
      } else {
        return res.json({
          statusCode: 400,
          message: "Invalid verified token!",
        });
      }
    } catch (error) {
      return next(error);
    }
  };
}

const Controlers = new AuthControllers();
const { register, login, signout, me, verifyAccount } = Controlers;
export { register, login, signout, me, verifyAccount };
