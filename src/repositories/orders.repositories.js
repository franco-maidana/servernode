import OrdersDTO from "../dto/orders.dto.js";
import dao from "../data/index.factory.js";

const { ordenes } = dao;

class OrdenesRepositories {
  constructor() {
    this.model = ordenes;
  }

  create = async (data) => {
    data = new OrdersDTO(data);
    const response = await this.model.create(data);
    return response;
  };
  read = async ({ filter, orderAndPaginate }) =>
    await this.model.read({ filter, orderAndPaginate });
  readOne = async (id) => await this.model.readOne(id);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const OrdenRep = new OrdenesRepositories();
export default OrdenRep;
