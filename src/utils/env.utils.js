import { config } from "dotenv";
import args from "./args.utils.js";

const { env } = args;
const path =
  env === "prod" ? "./.env.prod" : env === "dev" ? "./.env.dev" : "./.env.test";
config({ path });

export default {
  PORT: process.env.PORT,
  BD_MONGO: process.env.BD_MONGO,
  SECRET_KEY: process.env.SECRET_KEY,
  SECRET: process.env.SECRET,
  GOOGLE_ID_CLIENT: process.env.GOOGLE_ID_CLIENT,
  GOOGLE_SECRERT_CLIENT: process.env.GOOGLE_SECRERT_CLIENT,
  CLIENT_ID_GITHUB: process.env.CLIENT_ID_GITHUB,
  CLIEN_SECRERT_GITHUB: process.env.CLIEN_SECRERT_GITHUB,
};
