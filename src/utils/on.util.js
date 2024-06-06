process.on("exit", (code) =>
  console.log("el proceso termino con codigo " + code)
);

process.on("uncaughtException", (error) =>
  console.log("ha ocurrido un Error: " + error.message)
);

console.log(process.pid);
process.pid();
process.exit(1);
