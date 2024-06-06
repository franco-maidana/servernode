import CustomRouter from "../CustomRoouter.js";
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

    this.read("/", ["USER"], read);

    this.read("/:uid", ["USER"], readOne);

    this.upDate("/:eid", ["ADMIN"], update);

    this.destroy("/:eid", ["ADMIN", "PREM"], destroy);
  }
}
