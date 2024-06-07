import { expect } from "chai";
import "dotenv/config.js";
import dao from "../../src/data/index.factory.js";
import { Types } from "mongoose";
const { usuarios } = dao;


describe("Testeando Modelo usuarios",()=>{
    const model = usuarios;
    const data = {name: "Franco", email: "francomaidana094@gmail.com", password: "hola1234", verifiedCode: "qkUtM5xApjv+R4Ba"};
    let id;
    it("La creacion de un usuario requiere un objeto con la propiedad 'name' ",
    ()=> {
        expect(data).to.have.property("name")
    })
    it("La creación de un usuario no necesita un objeto con la propiedad imagen",
    ()=> {
        expect(data).not.to.have.property("image")
    })
    /*it("La funcion creadora de un usuario, devuelve un objeto con la propiedad id",
    async ()=> {
        const one = await model.create(data)
        expect(one).to.have.property("id")
    })*/
} )