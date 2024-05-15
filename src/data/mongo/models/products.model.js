import { model, Schema } from "mongoose";
import mongosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    photo: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    date: { type: Date, default: new Date(), index: true },
  },
  { timestamps: true }
);

schema.plugin(mongosePaginate);
const productosMongo = model(collection, schema);

export default productosMongo;
// mayuscula P
