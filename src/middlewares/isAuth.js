// esta autenticado ??
import { verifytoken } from "../utils/token.util.js";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const userData = verifytoken(token);
    if (userData) {
      return next();
    } else {
      const error = new Error("Bad auth from middleware");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};

export default isAuth
