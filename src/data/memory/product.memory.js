import crypto from "crypto";

class ProductManager {
  static GuardandoProductos = [];

  create(data) {
    const Evento = {
      id: crypto.randomBytes(12).toString("hex"),
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock || null,
    };
    ProductManager.GuardandoProductos.push(Evento);
    return Evento;
  }

  read(obj) {
    // const { filter, orderAndPaginate } = obj; // => despues se hace
    return ProductManager.GuardandoProductos;
  }

  readOne(id) {
    return ProductManager.GuardandoProductos.find(
      (each) => each.id === Number(id)
    );
  }

  destroy(id) {
    const index = ProductManager.GuardandoProductos.findIndex(
      (product) => product._id === id
    );

    if (index !== -1) {
      const deletedProduct = ProductManager.GuardandoProductos[index];
      ProductManager.GuardandoProductos.splice(index, 1);
      return deletedProduct; // Devuelve el producto eliminado
    }

    return null;
  }

  // actualiza el objeto de la lista
  update(id, data) {
    const index = ProductManager.GuardandoProductos.findIndex(
      (product) => product.id === id
    );

    if (index !== -1) {
      ProductManager.GuardandoProductos[index] = {
        ...ProductManager.GuardandoProductos[index],
        ...data,
        id: Number(id), // Garantiza que el ID no se actualice
      };
      return ProductManager.GuardandoProductos[index]; // Devuelve el producto actualizado
    }

    return null;
  }
}

const productos = new ProductManager();
export default productos;
