import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
//import dao from "../../src/data/index.factory.js";
//const { Usuarios } = dao;

const requester = supertest("http://localhost:8080/api");

describe("Testeando users", () => {
  const user = {
    name: "juan",
    email: "juan@coder.com",
    password: "hola1234",
    role: 1,
  };
  let uid;
  it("Registro de un usuario correctamente", async () => {
    const response = await requester.post("/sessions/register").send(user);
    const { _body, statusCode } = response;
    console.log("Esto es body", {_body, statusCode});
    expect(statusCode).to.be.equals(201);
  });
  
});
