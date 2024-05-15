import MongoManager from "./manager.model.js";
import OrderMongo from "./models/orders.model.js";

const Orden = new MongoManager(OrderMongo);
export default Orden;
