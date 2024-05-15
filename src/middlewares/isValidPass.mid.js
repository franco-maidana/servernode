import Usuarios from "../data/mongo/manager.model.js";
import isValidPassUtils from "../utils/isValidPass.utils.js";

async function isValidPass(req, res, next) {
  try {
    const { email, password } = req.body;
    const one = await Usuarios.readByEmail(email);
    const dbPassword = one.password;
    isValidPassUtils(password, dbPassword);
    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidPass;
