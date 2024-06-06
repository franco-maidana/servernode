import { describe, it } from "mocha";
import "dotenv/config.js";
import assert from "assert";
//import MongoManager from "../../src/data/mongo/manager.model.js"
import dao from "../../src/data/index.factory.js";
const { usuarios } = dao;

describe("Testeando Modelo Usuarios", () => {
  const model = new usuarios();
  console.log("Esto es el model",model); // Debería imprimir una instancia del modelo

  const data = {
    name: "Franco",
    email: "francomaidana094@gmail.com",
    password: "hola1234",
    verifiedCode: "qkUtM5xApjv+R4Ba"
  };

  it("La creación de un usuario requiere un objeto con la propiedad 'name'", () => {
    assert.ok(data.name);
  });

  it("La creación de un usuario no necesita un objeto con la propiedad imagen", () => {
    assert.strictEqual(data.imagen, undefined);
  });

  it("La función creadora de una mascota, devuelve un objeto con la propiedad 'id'", async () => {
    const one = await model.create(data)
    assert.ok(one._id);
  }); // no funciona
  
  /*it(
    "La funcion creadora de un usuario, devuelve un objeto",
    async()=> {
      const one = await model.create(data)
      assert.strictEqual(typeof one, "object")
    }
  )*/

  /*it(
    "La funcion para leer Usuarios debe devolver un array de Usuarios",
    async()=> {
      const all = await model.read()
      assert.ok(all)
    }
  )*/

  
});
