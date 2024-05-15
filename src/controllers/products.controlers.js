import service from "../services/products.service.js";
import CustomError from "../utils/errors/CustomError.utils.js";
import errors from "../utils/errors/error.js";

class ProductsControllers {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.success200(response);
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

      const all = await this.service.read({ filter, orderAndPaginate });
      if (all.docs.length > 0) {
        return res.success200(all);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const all = await this.service.readOne(uid);
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
      const one = await this.service.update(uid, data);
      return res.success201(one);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { eid } = req.params;
      const response = await this.service.destroy(eid);
      if (response) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductsControllers;
const controllers = new ProductsControllers();
const { create, read, readOne, update, destroy } = controllers;

export { create, read, readOne, update, destroy };
// se exporta a Products.router.api
