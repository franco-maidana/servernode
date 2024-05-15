import args from "../utils/args.utils.js";
import dbconnection from "../utils/db.js";
import logger from "../utils/logger/index.js";

const environment = args.env;
let dao = {};

switch (environment) {
  case "test":
    // vamos a usar MEMORY
    logger.INFO("MEMORY CONNECTED");
    // me traigo las ordenes de memori y las renombro
    const { default: productsMemory } = await import(
      "./memory/product.memory.js"
    );
    const { default: usersMemory } = await import("./memory/users.memory.js");
    const { default: ordersMemory } = await import("./memory/ordersManager.js");
    dao = {
      productos: productsMemory,
      usuarios: usersMemory,
      ordenes: ordersMemory,
    };
    break;
  case "dev":
    // vamos a usar FS
    logger.INFO("FS CONNECTED");
    // me traigos las ordenes de memory y los renombros despues los mando por el dao
    const { default: productsFS } = await import("./fs/products.fs.js");
    const { default: usersFS } = await import("./fs/users.fs.js");
    const { default: ordersFS } = await import("./fs/ordersManager.fs.js"); //metodo readOne ver me trae todas las orders
    dao = {
      productos: productsFS,
      usuarios: usersFS,
      ordenes: ordersFS,
    };
    break;
  case "prod":
    // vamos a usar MONGO
    dbconnection();
    logger.INFO("MONGO CONNECTED");
    // me traigo las ordenes de mongo y los renombros despues los mando por dao MONGO CONECT TENDRIA QUE IR ACA
    const { default: productsMongo } = await import(
      "./mongo/products.mongo.js"
    );
    const { default: usersMongo } = await import("./mongo/users.mongo.js");
    const { default: ordersMongo } = await import("./mongo/orders.mongo.js"); //metodo readOne ver me trae todas las orders
    dao = {
      productos: productsMongo,
      usuarios: usersMongo,
      ordenes: ordersMongo,
    };
    break;

  default:
    break;
}

export default dao;
// lo exportamos al archivo repoositories
