import { model, Schema, Types } from "mongoose";
import mongosePaginate from "mongoose-paginate-v2";

const collection = "orders";
const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    products_id: { type: Types.ObjectId, required: true, ref: "products" },
    quantity: { type: Number, default: 1 },
    state: {type: String, default: "reserved", enum: ["reserved", "payed", "delivered"] },
  },
  { timestamps: true }
);

// filtrado de ordenes con parametros para las apis
schema.pre("find", function () {
  this.populate("user_id", "name email");
});
schema.pre("find", function () {
  this.populate("products_id", "title price");
});

schema.plugin(mongosePaginate);

const OrderMongo = model(collection, schema);
export default OrderMongo;
