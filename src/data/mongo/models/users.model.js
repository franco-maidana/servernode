import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    verifiedCode: { type: String, required: true },
    photo: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
    age: { type: Number, default: 18 },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const UsuarioMongo = model(collection, schema);
export default UsuarioMongo;
