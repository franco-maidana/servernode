import logger from "./logger";

process.on("exit", (code) =>
  logger.INFO("el proceso termino con codigo " + code)
);

process.on("uncaughtException", (error) =>
  logger.INFO("ha ocurrido un Error: " + error.message)
);

logger.INFO(process.pid);
process.pid();
process.exit(1);
