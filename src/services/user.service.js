// import { Usuarios } from "../data/mongo/manager.model.js";
import UsuarioRepositorio from "../repositories/users.repositories.js";
import sendEmail from "../utils/sendEmail.util.js";

class UserService {
  constructor() {
    this.UsuarioRepositorio = UsuarioRepositorio;
  }
  create = async (data) => await this.UsuarioRepositorio.create(data);
  read = async ({ filter, ordenAndPaginate }) =>
    await this.UsuarioRepositorio.read({ filter, ordenAndPaginate });
  readOne = async (id) => await this.UsuarioRepositorio.readOne(id);
  readByEmail = async (email) =>
    await this.UsuarioRepositorio.readByEmail(email);
  update = async (id, data) => await this.UsuarioRepositorio.update(id, data);
  destroy = async (id) => await this.UsuarioRepositorio.destroy(id);
  register = async (data) => {
    try {
      await sendEmail(data);
    } catch (error) {
      throw error;
    }
  };
}

const service = new UserService();
export default service;
