import sendSms from "../utils/sendSms.utils.js";
import CustomRouter from "./CustomRoouter.js";
import ApiRouter from "./api/index.router.api.js";
import ViewsRoueter from "./views/index.router.view.js";
import logger from "../utils/logger/index.js";

const api = new ApiRouter(); // instancia de la clase
const apiRouter = api.getRouter(); // enrutador

const views = new ViewsRoueter();
const viewsRouter = views.getRouter();

export default class indexRouter extends CustomRouter {
  //  con el metodo init puedo usar todas
  //  las funciones que hay dentro del customRouter
  init() {
    this.router.use("/api", apiRouter); // => apis
    this.router.use("/", viewsRouter); // => vistas
    this.router.use("/sms", async (req, res, next) => {
      try {
        await sendSms("+542215220686");
        return res.json({
          statusCode: 200,
          message: "hola",
        });
      } catch (error) {
        return next(error);
      }
    });
    this.router.use("/simplex", (req, res, next) => {
      logger.INFO(process.pid)
      try {
        let total = 1;
        for (let i = 0; i < 100; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });

    this.router.use("/complex", (req, res, next) => {
      logger.INFO(process.pid)
      try {
        let total = 1;
        for (let i = 0; i < 100000000; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
  }
}
