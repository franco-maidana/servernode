class ComentarioManager {
  static Comentarios = [];

  create(data) {
    try {
      const nuevoComentario = {
        id: data.id,
        text: data.text,
        product_id: data.product_id,
        users_id: data.users_id,
      };
      ComentarioManager.Comentarios.push(nuevoComentario);
      // console.log(" ESTE ES EL NUEVO COMENTARIO", nuevoComentario);
      return nuevoComentario.id;
    } catch (error) {
      throw error;
    }
  }

  read() {
    try {
      if (ComentarioManager.Comentarios.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return ComentarioManager.Comentarios;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = ComentarioManager.Comentarios.find((each) => each.id === id);
      console.log("ESTO ES ONE", one);
      if (!one) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  async upDate(id, data) {
    try {
      const index = ComentarioManager.Comentarios.findIndex(
        (coment) => coment.id === id
      );
      if (index !== -1) {
        ComentarioManager.Comentarios[index] = {
          ...ComentarioManager.Comentarios[index],
          ...data,
        };
        return ComentarioManager.Comentarios[index];
      } else {
        const error = new Error("Comentario no encontrado.");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = this.read(id);
      if (one) {
        ComentarioManager.Comentarios = ComentarioManager.Comentarios.filter(
          (each) => each.id !== id
        );
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
}

const comentario = new ComentarioManager();
comentario.create({
  id: 1,
  text: "holaaa",
  product_id: "5478525r885f578",
  users_id: "5457557875459898",
});

comentario.create({
  id: 2,
  text: "queria consultar si tienen stock",
  product_id: "5457873217846787",
  users_id: "87984255487238385785",
});

comentario.create({
  id: 3,
  text: "el talle de remera es L o XL",
  product_id: "5457873217587587",
  users_id: "879842kd4s57845s8e24s8",
});

console.log(comentario.read());
console.log("BUSCAMOS EL PRIMER COMENTARIO POR EL ID", comentario.readOne(2));

const ComentarioModificado = comentario.readOne(2);
console.log(ComentarioModificado);
const ComentarioActualizado = comentario.upDate(ComentarioModificado.id, {
  text: "muchas gracias por contestar",
});
console.log(ComentarioActualizado);
console.log("cometario eliminado", comentario.destroy(2));
console.log("lista nueva de comentarios", comentario.read());
