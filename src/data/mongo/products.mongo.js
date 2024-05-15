import MongoManager from "./manager.model.js";
import productosMongo from "./models/products.model.js";

const Products = new MongoManager(productosMongo);
export default Products;
