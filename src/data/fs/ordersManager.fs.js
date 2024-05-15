import fs from "fs";

class OrdersManager {
  static ordenGuardada = [];

  constructor(path) {
    (this.path = path), this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      OrdersManager.ordenGuardada = JSON.parse(
        fs.readFileSync(this.path, "utf-8")
      );
    }
  }

  async create(data) {
    try {
      OrdersManager.ordenGuardada.push(data); // Agrega la nueva orden al arreglo de órdenes
      const jsonData = JSON.stringify(OrdersManager.ordenGuardada, null, 2); // Convierte el arreglo de órdenes a formato JSON
      await fs.promises.writeFile(this.path, jsonData); // Escribe el JSON en el archivo
      return data; // Devuelve la nueva orden agregada
    } catch (error) {
      throw error; // Lanza cualquier error que ocurra durante el proceso
    }
  }

  async read() {
    try {
      const ordersData = await fs.promises.readFile(this.path, "utf-8");
      const orders = JSON.parse(ordersData);
      return orders;
    } catch (error) {
      console.error("Error reading orders:", error.message);
      return [];
    }
  }

  async readOne(id) {
    try {
      const order = OrdersManager.ordenGuardada.find(
        (order) => order._id === id
      );
      if (order) {
        return order;
      } else {
        throw new Error("Orden no encontrada");
      }
    } catch (error) {
      console.error("Error al leer una orden:", error.message);
      throw error;
    }
  }

  async upDate(id, data) {
    try {
      const one = await this.readOne(id); // Busca la orden por su id
      if (!one) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
      }
      // Actualiza los campos de la orden con los datos proporcionados
      for (let key in data) {
        one[key] = data[key];
      }
      // Actualiza la orden en el arreglo de órdenes guardadas
      const index = OrdersManager.ordenGuardada.findIndex(
        (order) => order._id === id
      );
      OrdersManager.ordenGuardada[index] = one;
      // Escribe los cambios en el archivo
      const jsonData = JSON.stringify(OrdersManager.ordenGuardada, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const oen = await this.readOne(id); // Busca la orden por su id
      if (!oen) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
      }
      // Elimina la orden del arreglo de órdenes guardadas
      OrdersManager.ordenGuardada = OrdersManager.ordenGuardada.filter(
        (order) => order._id !== id
      );
      // Escribe los cambios en el archivo
      const jsonData = JSON.stringify(OrdersManager.ordenGuardada, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return oen;
    } catch (error) {
      throw error;
    }
  }
}

const ordenManager = new OrdersManager(
  "./src/data/fs/files/OrdenesManager.json"
);

export default ordenManager;
