// import { ordenManager } from "../data/mongo/manager.model.js";
import OrdenRep from "../repositories/orders.repositories.js";
import OrdersDTO from "../dto/orders.dto.js";

class OrdenService {
  constructor() {
    this.OrdenRep = OrdenRep;
  }
  create = async (data) => {
    data = new OrdersDTO(data);
    const response = await this.OrdenRep.create(data);
    return response;
  };
  read = async ({ filter, ordenAndPaginate }) =>
    await this.OrdenRep.read({ filter, ordenAndPaginate });
  report = async (id) => await this.OrdenRep.reportBill(id);
  readOne = async (id) => await this.OrdenRep.readOne(id);
  update = async (id, data) => {
    try {
      const opciones = { new: true }; // Esta opción devuelve el documento modificado en lugar del original
      const unoActualizado = await this.OrdenRep.update(id, data, opciones);
      return unoActualizado; // Asegúrate de devolver el documento actualizado
    } catch (error) {
      throw error;
    }
  };
  destroy = async (id) => await this.OrdenRep.destroy(id);
}

const OrderService = new OrdenService();
export default OrderService;
// lo exportamos al archivo controlers
