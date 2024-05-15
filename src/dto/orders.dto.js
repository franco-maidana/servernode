import args from "../utils/args.utils.js";
import crypto from "crypto";

class OrdersDTO {
  constructor(data) {
    if (!data.products_id) {
      throw new Error("products_id es obligatorio en OrdersDTO");
    }
    args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"));
    this.user_id = data.user_id;
    this.products_id = data.products_id;
    this.quantity = data.quantity;
    this.state = data.state || "reserved";
    args.env !== "prod" && (this.updatedAt = new Date());
    args.env !== "prod" && (this.createdAt = new Date());
  }
}

export default OrdersDTO;
// lo ecportamos para ordersRepositories y servicios
