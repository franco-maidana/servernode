// import { Router } from "express";
import CustomRouter from "../CustomRoouter.js";
import ProductsRouter from "./products.view.js";
import UsersRouter from "./users.view.js";
import ordenRouter from "./orders.router.view.js";
import productos from "../../data/mongo/products.mongo.js";

const product = new ProductsRouter();
const usersRouter = new UsersRouter();

export default class ViewsRoueter extends CustomRouter {
  init() {
    this.router.use("/products", product.getRouter());
    this.router.use("/users", usersRouter.getRouter());
    this.router.use("/orders", ordenRouter);
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        let filter = {};
        let orderAndPaginate = { lean: true };
        if (req.query.user_id) {
          filter = { user_id: req.query.user_id };
        }
        if (req.query.order) {
          const [field, sortOrder] = req.query.order.split(":");
          if (field && sortOrder) {
            orderAndPaginate[field] =
              sortOrder.toLowerCase() === "asc" ? 1 : -1;
          }
        }
        const products = await productos.read({ filter, orderAndPaginate });
        const date = new Date();
        return res.render("index", { products: products, date });
      } catch (error) {
        return next(error);
      }
    });
  }
}
