import CustomRouter from "../CustomRoouter.js";
import checkoutControllers from "../../controllers/payments.controllers.js"


export default class PaymentsRouter extends CustomRouter {
    init(){
        this.create("/checkout", ["USER", "ADMIN", "PREM"], checkoutControllers )
    }
}