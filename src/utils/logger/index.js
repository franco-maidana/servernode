import args from "../args.utils.js";

const environment = args.env;
let logger;

switch (environment) {
  case "prod":
    const { default: winstonProd } = await import("./winston.utils.js");
    logger = winstonProd;
    break;
  default:
    const { default: winstonTest } = await import("./winstonDev.utils.js");
    logger = winstonTest;
    break;
}

export default logger;
