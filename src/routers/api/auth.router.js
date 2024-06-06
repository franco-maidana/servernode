import CustomRouter from "../CustomRoouter.js";
import {
  register,
  login,
  signout,
  me,
  verifyAccount,
} from "../../controllers/auth.controllers.js";
import passCallBack from "../../middlewares/passCallBack.js";
import has8char from "../../utils/has8char.util.js";

export default class AuthRouter extends CustomRouter {
  init() {
    this.create("/register",["PUBLIC"], has8char, passCallBack("register"), register);
    this.create("/login", ["PUBLIC"], passCallBack("login"), login);
    this.create("/signout", ["USER", "ADMIN", "PREM"], passCallBack("jwt"), signout);
    this.create("/me", ["USER"], me);
    this.create("/", ["PUBLIC"], verifyAccount);
  }
}
