import { fork } from "child_process";
import CustomRouter from "../CustomRoouter.js";
import UsersRouter from "./user.router.api.js";
import ProductsRouter from "./products.router.api.js";
import OrdersRouter from "./orders.router.api.js";
import LoggerRouter from "./logger.api.js";
// import cookiesRouter from "./cookies.router.api.js"; => es solo de ejemplo
// import sessionsRouter from "./sessions.router.api.js";
import AuthRouter from "./auth.router.js";
import passCallBack from "../../middlewares/passCallBack.js";
import logger from "../../utils/logger/index.js";

const products = new ProductsRouter();
const Users = new UsersRouter();
const Orders = new OrdersRouter();
const Auth = new AuthRouter();
const loggers = new LoggerRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", Users.getRouter());
    this.use("/products", products.getRouter());
    this.use("/orders", Orders.getRouter()); // si desactivo el passCallBack me sale las ordenes en react
    // this.use("/session", sessionsRouter);
    this.use("/auth", Auth.getRouter());
    this.read("/sum", ["PUBLIC"], async (req, res, next) => {
      try {
        logger.INFO("Global proccess ID:" + process.pid);
        const child = fork("./src/utils/sum.util.js");
        // para enviar al hijo para ejecutar la funcion
        child.send("start");
        // para recibir
        child.on("message", (result) => res.success200(result));

        // const child1 = fork("./src/utils/sum.util.js");
        // const child2 = fork("./src/utils/subtract.utils.js");
        // child1.send("start");
        // child2.send("start");
        // const results = {};
        // child1.on("message", (result) => (results.sum = result));
        // child2.on("message", (result) => (res.subtract = result));
      } catch (error) {
        return next(error);
      }
    });
    this.use("/loggers", loggers.getRouter());
  }
}
