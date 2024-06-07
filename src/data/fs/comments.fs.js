import fs from "fs";

class CommentsManager {
  static CommentsGuardado = [];

  constructor(path) {
    this.path = path;
    this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      CommentsManager.CommentsGuardado = JSON.parse(
        fs.readFileSync(this.path, "utf-8")
      );
    }
  }

  async create(data) {
    try {
      CommentsManager.CommentsGuardado.push(data);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(CommentsManager.CommentsGuardado, null, 2),
        "utf-8"
      );
      return data;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  async read(obj) {
    try {
      // const {filter , orderAndPaginate} = obj
      const one = fs.readFileSync(this.path, "utf-8");
      const comentario = JSON.parse(one);
      return comentario;
    } catch (error) {
      console.error("Error al leer o parsear el archivo", error);
      return null;
    }
  }

  async readOne(id) {
    try {
      const one = CommentsManager.CommentsGuardado.find(
        (each) => each._id === id
      );
      if (one) {
        return one;
      } else {
        throw new Error("Comentarios no encontrados");
      }
    } catch (error) {
      return error.message;
    }
  }

  async upDate(id, data) {
    try {
      const index = CommentsManager.CommentsGuardado.findIndex(
        (comment) => comment._id === id
      );
      if (index !== -1) {
        CommentsManager.CommentsGuardado[index] = {
          ...CommentsManager.CommentsGuardado[index],
          ...data,
        };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(CommentsManager.CommentsGuardado, null, 2),
          "utf-8"
        );
        const one = CommentsManager.CommentsGuardado[index];
        return one;
      }
      throw new Error("Producto no encontrado");
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const one = CommentsManager.CommentsGuardado.findIndex(
        (product) => product._id === id
      );
      if (one !== -1) {
        CommentsManager.CommentsGuardado.splice(one, 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(CommentsManager.CommentsGuardado, null, 2),
          "utf-8"
        );
        return "Producto eliminado:", id;
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
      return error.message;
    }
  }
}

const comentarios = new CommentsManager("./src/data/fs/files/comentarios.json");
export default comentarios;

