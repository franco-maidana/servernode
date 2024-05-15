import CustomRouter from "../CustomRoouter.js";
import logger from "../../utils/logger/index.js";

export default class LoggerRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], (req, res, next) => {
      logger.HTTP("HTTP");
      logger.INFO("INFO");
      logger.ERROR("ERROR");
      logger.FATAL("FATAL");
      res.send("TEST LOGGER");
    });
  }
}
