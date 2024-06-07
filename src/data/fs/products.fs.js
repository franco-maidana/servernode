import fs from "fs";
import crypto from "crypto";

class ProductManager {
  static #productosGuardados = [];

  constructor(path) {
    this.path = path;
    this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      ProductManager.#productosGuardados = JSON.parse(
        fs.readFileSync(this.path, "utf-8")
      );
    }
  }

  async create(data) {
    try {
      ProductManager.#productosGuardados.push(data);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(ProductManager.#productosGuardados, null, 2),
        "utf-8"
      );
      return data;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  read(obj) {
    try {
      // const { filter, orderAndPaginate } = obj; => se destructura mas adelante
      const usersData = fs.readFileSync(this.path, "utf-8"); // Corregir la lectura del archivo
      const users = JSON.parse(usersData);
      return users;
    } catch (error) {
      console.error("Error al leer o parsear el archivo:", error.message);
      return null;
    }
  }

  readOne(id) {
    try {
      const newProduct = ProductManager.#productosGuardados.find(
        (each) => each._id === id
      );
      if (newProduct) {
        return newProduct;
      } else {
        throw new Error("producto no encontrado");
      }
    } catch (error) {
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const index = ProductManager.#productosGuardados.findIndex(
        (product) => product._id === id
      );
      if (index !== -1) {
        ProductManager.#productosGuardados.splice(index, 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#productosGuardados, null, 2),
          "utf-8"
        );
        return "Producto eliminado correctamente.";
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
      return error.message;
    }
  }

  async update(id, data) {
    try {
      const index = ProductManager.#productosGuardados.findIndex(
        (product) => product._id === id
      );
      if (index !== -1) {
        ProductManager.#productosGuardados[index] = {
          ...ProductManager.#productosGuardados[index],
          ...data,
        };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#productosGuardados, null, 2),
          "utf-8"
        );
        return ProductManager.#productosGuardados[index];
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
}

const productos = new ProductManager("./src/data/fs/files/productos.json");

export default productos;
