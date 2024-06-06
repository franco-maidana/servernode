import args from "../utils/args.utils.js";
import crypto from "crypto";

class ProductsDTO {
  constructor(data) {
    args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex")),
      (this.title = data.title),
      (this.photo = data.photo),
      (this.price = data.price),
      (this.stock = data.stock),
      (this.owner_id = data.owner_id),
      (this.date = data.date || new Date()),
      args.env !== "prod" && (this.updateAt = new Date());
    args.env !== "prod" && (this.createAt = new Date());
  }
}

export default ProductsDTO;
// para ser uso del Dto se crea una nueva capa y se envia al archivo repositories
