import fs from "fs";

class UsersManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      throw error;
    }
  }

  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }

  async create(data) {
    try {
      if (!data.name || !data.email) {
        const error = new Error("name & email are required");
        error.statusCode = 400;
        throw error;
      }
      this.users.push(data);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  read() {
    try {
      if (this.users.length === 0) {
        const error = new Error("there aren't users!");
        error.statusCode = 404;
        throw error;
      } else {
        return this.users;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = this.users.find((each) => each._id === id);
      if (!one) {
        const error = new Error("there isn't user!");
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
      // Busca el usuario para actualizarlo
      const one = this.readOne(id);
      // Actualiza los datos del usuario con los nuevos datos
      for (let key in data) {
        one[key] = data[key];
      }
      // Escribe los cambios en el archivo
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      // Devuelve el usuario actualizado
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      // Busca el usuario para devolverlo antes de eliminarlo
      const one = this.readOne(id);
      // Filtra el arreglo de usuarios para eliminar el usuario con el _id dado
      this.users = this.users.filter((user) => user._id !== id);
      // Guarda los cambios en el archivo
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      // Devuelve el usuario eliminado
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const Usuarios = new UsersManager("./src/data/fs/files/users.json");
export default Usuarios;
