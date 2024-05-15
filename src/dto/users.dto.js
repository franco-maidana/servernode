import args from "../utils/args.utils.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.util.js";

class UserDTO {
  constructor(data) {
    args.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"));
    (this.name = data.name),
      (this.email = data.email),
      (this.password = createHash(data.password)),
      (this.photo = data.photo || "https://i.postimg.cc/wTgNFWhR/profile.png"),
      (this.age = data.age),
      (this.role = data.role || 0);
    this.verified = data.verified || false;
    this.verifiedCode = crypto.randomBytes(12).toString("base64");
    args.env !== "prod" && (this.updatedAt = new Date());
    args.env !== "prod" && (this.createdAt = new Date());
  }
}

export default UserDTO;
// para ser uso del Dto se crea una nueva capa y se envia al archivo repositories
