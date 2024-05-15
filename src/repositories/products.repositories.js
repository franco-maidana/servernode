import ProductsDTO from "../dto/products.dto.js";
import dao from "../data/index.factory.js";
const { productos } = dao;

class productsRepositories {
  constructor() {
    this.model = productos;
  }

  create = async (data) => {
    // reasignamos el valor del requerimiento con el dto
    data = new ProductsDTO(data);
    const response = await this.model.create(data);
    return response;
  };

  read = async ({ filter, orderAndPaginate }) =>
    await this.model.read({ filter, orderAndPaginate });
  readOne = async (id) => await this.model.readOne(id);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const repositorio = new productsRepositories();
export default repositorio;
// lo exportamos a la capa de products.servicios.js
