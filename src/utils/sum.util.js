import logger from "./logger/index.js";

function sum() {
  let counter = 0;
  for (let i = 0; i < 5e9; i++) {
    counter++;
  }
  return counter;
}

process.on("message", () => {
  const result = sum();
  logger.INFO("Child proccess ID:" + process.pid);
  process.send(result);
});
