import MongoManager from "./manager.model.js";
import UsuarioMongo from "./models/users.model.js";

const Usuarios = new MongoManager(UsuarioMongo);
export default Usuarios;