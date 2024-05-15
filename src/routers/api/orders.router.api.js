import CustomRouter from "../CustomRoouter.js";
import {
  create,
  read,
  report,
  readOne,
  update,
  destroy,
} from "../../controllers/orders.controlers.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "ADMIN", "PREM"], create);
    this.read("/", ["USER", "ADMIN", "PUBLIC", "PREM"], read); // si lo pongo en publico me sale las ordenes en react
    this.read("/bills/:uid", ["ADMIN", "USER"], report);
    this.read("/:uid", ["ADMIN", "USER"], readOne);
    this.upDate("/:uid", ["PREM", "USER", "ADMIN"], update);
    this.destroy("/:uid", ["PREM", "USER", "ADMIN"], destroy);
  }
}
