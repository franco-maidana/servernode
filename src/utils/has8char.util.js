import CustomError from "./errors/CustomError.utils.js";
import errors from "./errors/error.js";

// has8char.util.js
export default function has8char(req, res, next) {
  const { password } = req.body;
  if (password && password.length >= 8) {
    next();
  } else {
    // res
    //   .status(400)
    //   .send({ message: "La contraseña debe tener al menos 8 caracteres." });
    CustomError.new(
      errors.message("the password must contain at least 8 characters")
    );
  }
}
