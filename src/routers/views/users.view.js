import CustomRouter from "../CustomRoouter.js";

export default class UsersRouter extends CustomRouter {
  init() {
    // ruta de vista de registro
    this.read("/register", ["PUBLIC"], (req, res, next) => {
      try {
        return res.render("register", { title: "REGISTRO" });
      } catch (error) {
        next(error);
      }
    });
    // rutsa de vista de inicio de session
    this.read("/login", ["PUBLIC"], (req, res, next) => {
      try {
        return res.render("login");
      } catch (error) {
        next(error);
      }
    });
  }
}
