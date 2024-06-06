import CustomRouter from "../CustomRoouter.js";
import {
  create,
  read,
  reportBill,
  readOne,
  update,
  destroy,
} from "../../controllers/orders.controlers.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "ADMIN", "PREM"], create);

    this.read("/",["USER", "ADMIN", "PUBLIC", "PREM"],read);

    this.read("/bills/:uid", ["PUBLIC"], reportBill);

    this.read("/:uid", ["USER", "PUBLIC"], readOne);

    this.upDate("/:uid", ["PREM", "USER", "ADMIN"], update);

    this.destroy("/:uid", ["PREM", "USER", "ADMIN"], destroy);
  }
}
