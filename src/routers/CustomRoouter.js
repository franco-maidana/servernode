import { Router } from "express";
import Usuarios from "../data/mongo/users.mongo.js";
import jwt from "jsonwebtoken";
import errors from "../utils/errors/error.js";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  // funcion encargada de retornar el enrutador
  getRouter() {
    return this.router;
  }
  // funcion inicializadora de la instancia
  init() {}

  applyCbs(cbs) {
    return cbs.map((each) => async (...params) => {
      try {
        // Llamar directamente a la función each con los parámetros
        await each(...params);
      } catch (error) {
        // Acceder al segundo parámetro para obtener la respuesta (res)
        params[1].json({
          statusCode: 500,
          message: error.message, // "message" en lugar de "messege"
        });
      }
    });
  }

  policies = (arrayOfPolicies) => async (req, res, next) => {
    try {
      if (arrayOfPolicies.includes("PUBLIC")) return next();
      let token = req.cookies["token"];
      if (!token) return res.error401();
      else {
        const data = jwt.verify(token, process.env.SECRET);
        if (!data) return res.error400("Bad auth by token!");
        else {
          const { email, role } = data;
          if (
            (role === 0 && arrayOfPolicies.includes("USER")) ||
            (role === 1 && arrayOfPolicies.includes("ADMIN")) ||
            (role === 2 && arrayOfPolicies.includes("PREM"))
          ) {
            const user = await Usuarios.readByEmail(email);
            req.user = user;
            return next();
          } else return res.error403();
        }
      }
    } catch (error) {
      return next(error);
    }
  };

  response(req, res, next) {
    res.success200 = (payload) =>
      res.json({ statusCode: 200, response: payload });
    res.success201 = (payload) =>
      res.json({ statusCode: 201, response: payload });
    res.error400 = (message) => res.json(errors.message(message));
    res.error401 = () => res.json(errors.badAuth);
    res.error403 = () => res.json(errors.forbidden);
    res.error404 = () => res.json(errors.notFound);
    return next();
  }

  // generar un metodo de tipo post generico
  create(path, policies, ...cbs) {
    this.router.post(
      path,
      this.response,
      this.policies(policies),
      this.applyCbs(cbs)
    );
  }
  // generar un metodo de tipo GET
  read(path, policies, ...cbs) {
    this.router.get(
      path,
      this.response,
      this.policies(policies),
      this.applyCbs(cbs)
    );
  }
  // metodo para modificar
  upDate(path, policies, ...cbs) {
    this.router.put(
      path,
      this.response,
      this.policies(policies),
      this.applyCbs(cbs)
    );
  }
  // metodo para eliminar
  destroy(path, policies, ...cbs) {
    this.router.delete(
      path,
      this.response,
      this.policies(policies),
      this.applyCbs(cbs)
    );
  }
  // metodo use
  use(path, ...cbs) {
    this.router.use(path, this.response, this.applyCbs(cbs));
  }
}
