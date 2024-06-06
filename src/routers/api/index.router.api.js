import { fork } from "child_process";
import CustomRouter from "../CustomRoouter.js";
import UsersRouter from "./user.router.api.js";
import ProductsRouter from "./products.router.api.js";
import OrdersRouter from "./orders.router.api.js";
import PaymentsRouter from "./payments.api.js";
import LoggerRouter from "./logger.api.js";
// import cookiesRouter from "./cookies.router.api.js"; => es solo de ejemplo
// import sessionsRouter from "./sessions.router.api.js";
import AuthRouter from "./auth.router.js";

const products = new ProductsRouter();
const Users = new UsersRouter();
const Orders = new OrdersRouter();
const Auth = new AuthRouter();
const logger = new LoggerRouter();
const checkout = new PaymentsRouter()

export default class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", Users.getRouter());
    this.use("/products", products.getRouter());
    this.use("/orders", Orders.getRouter()); // si desactivo el passCallBack me sale las ordenes en react
    this.use("/sessions", Auth.getRouter());
    this.use("/loggers", logger.getRouter());
    this.use("/payments", checkout.getRouter())
  }
}
