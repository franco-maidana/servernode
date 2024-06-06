import fs from "fs";

class CommentsManager {
  static CommentsGuardado = [];

  constructor(path) {
    this.path = path;
    this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    console.log(exist);
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
      // console.log(newComments);
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
        console.log("ACA ESTAN TODOS LOS COMENTARIOS", one);
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
        console.log("Producto actualizado:", one);
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

// comentarios
//   .create({
//     text: "Este producto es lo mas, ",
//     user_id: "45826dkki658965875",
//     product_id: "55982s8yy87989w5",
//   })
//   .then((resultado) => {
//     console.log("Comentario agregado:", resultado);
//   })
//   .catch((error) => {
//     console.error("Error al agregar el comentario:", error);
//   });  => FUNCIONA

// comentarios.readOne("6174af5e3bf59dd38021b30e"); => FUNCIONA

// const id = "09316417f4f4f6ec12b2bd25";
// const comentarioModificado = {
//   text: "los mejores pantalones que me eh comprado!!!",
// };
// comentarios.upDate(id, comentarioModificado); => FUNCIONA

// comentarios.destroy("efa2ef227ce29dc972399eb5"); => FUNCIONA
