//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // provisorio por no tener el certificado SSL en la PC 
//desactivará la verificación de certificados para todas las conexiones TLS en tu aplicación. Aquí está cómo se vería:
import env from "./src/utils/env.utils.js";
import express from "express";
import indexRouter from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";
import passport from "./src/middlewares/passport.mid.js"; // Asegúrate de que esta ruta es correcta
import args from "./src/utils/args.utils.js";
import cors from "cors";
import compression from "express-compression";
import winstom from "./src/middlewares/winston.mid.js";
import logger from "./src/utils/logger/index.js";
import cluster from "cluster"
import { cpus } from "os";
import swaggerJSDoc from "swagger-jsdoc";
import {serve , setup } from "swagger-ui-express" 

import options from "./src/utils/swagger.js";


// server
const server = express();
const PORT = env.PORT || 8080;
const ready = () => {
  logger.INFO("server ready on port " + PORT);
};
//server.listen(PORT, ready);

// Cluster
logger.INFO(cluster.isPrimary)
if (cluster.isPrimary){
  logger.INFO("PRIMARY ID :" ,process.pid);
  const numberOfProcess = cpus().length
  logger.INFO("numero de procesadores: " + numberOfProcess);
  for(let i = 1 ; i <= numberOfProcess; i++){
    cluster.fork()  //proceso hijo primer servidor creado
  }
} else {
  logger.INFO("WORKER ID :",process.pid);
  server.listen(PORT, ready); // son hijos del servidor creado
}


//swagger
const specs = swaggerJSDoc(options)
server.use("/api/docs", serve , setup(specs))
//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

const FileStore = sessionFileStore(expressSession);

//middlewares
server.use(cookieParser(process.env.SECRET_KEY));

// MONGO STORAGE
server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60,
      mongoUrl: process.env.BD_MONGO,
    }),
  })
);

// Inicializar Passport y restaurar la sesión del usuario, si existe
server.use(passport.initialize());
server.use(passport.session());

server.use(
  cors({
    origin: true,
    credentials: true,
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use(winstom);
server.use(
  compression({
    brotli: { enabled: true, zlid: {} },
  })
); // algoritmo de comprecion al servidor

// metodo para ver las apis y vistas con el metodo nuevo
const router = new indexRouter();

server.use("/", router.getRouter()); // => le pasamos el metodo getRouter() para que no de errores
server.use(pathHandler);
server.use(errorHandler);

console.log(args);
