import { Router } from "express";
//import { ordenManager } from "../../data/mongo/manager.model.js";
import Orden from "../../data/mongo/orders.mongo.js";
import passport from "../../middlewares/passport.mid.js";

const ordenRouter = Router();

ordenRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let filter = {};
      let orderAndPaginate = { lean: true };
      // console.log("esto es req.user ", req.user);
      filter = { user_id: req.user._id };

      if (req.order) {
        const [field, sortOrder] = req.order.split(":");
        if (field && sortOrder) {
          orderAndPaginate[field] = sortOrder.toLowerCase() === "asc" ? 1 : -1;
          return orderAndPaginate[field];
        }
      }
      const all = await Orden.read({ filter, orderAndPaginate });
      console.log("ESTO ES ALL", all);
      return res.render("orders", { orders: all.docs });
    } catch (error) {
      return next(error);
    }
  }
);

export default ordenRouter;
