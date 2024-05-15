import OrderService from "../services/order.service.js";

class OrdersControllers {
  constructor() {
    this.OrderService = OrderService;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.user_id = req.user._id;
      const one = await this.OrderService.create(data);
      return res.success201(one);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const orderAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.query.title) {
        filter.title = new RegExp(req.query.title.trim(), "i");
      }
      if (req.query.sort === "desc") {
        orderAndPaginate.sort.title = "desc";
      }
      const all = await this.OrderService.read({ filter, orderAndPaginate });
      if (all.docs.length > 0) {
        return res.success200(all);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };

  report = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const report = await this.OrderService.report(uid);
      return res.success201(report);
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const all = await this.OrderService.readOne(uid);
      if (all) {
        return res.success200(all);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = await this.OrderService.update(uid, data);
      if (one) {
        return res.success200(one);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const response = await this.OrderService.destroy(uid);
      if (response) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };
}

export default OrdersControllers;
const controlers = new OrdersControllers();
const { create, read, readOne, report, update, destroy } = controlers;
export { create, read, readOne, report, update, destroy };
