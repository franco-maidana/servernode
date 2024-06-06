import args from "../args.utils.js";

const environment = args.env;
let logger;

switch (environment) {
  case "prod":
    const { default: winstonProd } = await import("./winston.utils.js");
    logger = winstonProd;
    break;
  case "dev":
    const { default: winstonStart } = await import("./winston.utils.js");
    logger = winstonStart;
    break;
  case "test":
    const { default: winstonTest } = await import("./winston.utils.js");
    logger = winstonTest;
    break;
  default:
    const { default: winstonDev } = await import("./winstonDev.utils.js");
    logger = winstonDev;
    break;
}

export default logger;
