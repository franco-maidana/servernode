import CustomRouter from "../CustomRoouter.js";
// import productos from "../../data/fs/products.fs.js";
import isAuth from "../../middlewares/isAuth.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/products.controlers.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREM"], isAuth, create);

    this.read("/", ["PUBLIC"], read);

    this.read("/:uid", ["PUBLIC"], readOne);

    this.upDate("/:uid", ["ADMIN", "USER", "PREM"], update);

    this.destroy("/:uid", ["ADMIN", "USER", "PREM"], destroy);
  }
}
