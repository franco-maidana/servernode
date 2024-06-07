import checkoutService from "../services/paymets.service.js"

const checkoutControllers = async (req,res,next) => {
    try {
        const user_id = req.user._id // id del usuario logeado
        const response = await checkoutService(user_id)
        return res.json(response)
    } catch (error) {
        return next(error)
    }
}

export default checkoutControllers