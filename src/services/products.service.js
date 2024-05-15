import repositorio from "../repositories/products.repositories.js";

class ProductsService {
  constructor() {
    // se construlle en base al repositorio
    this.repositorio = repositorio;
  }
  create = async (data) => {
    try {
      const response = await this.repositorio.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ filter, orderAndPaginate }) => {
    try {
      const response = await this.repositorio.read({
        filter,
        orderAndPaginate,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (id) => {
    try {
      const response = await this.repositorio.readOne(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, data) => await this.repositorio.update(id, data);

  destroy = async (id) => {
    try {
      const response = await this.repositorio.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new ProductsService();
export default service;
// se exoprta a los controllers
