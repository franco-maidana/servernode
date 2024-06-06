import checkoutRepository from "../repositories/payments.repositories.js"

const checkoutService = async(filter,) => {
    try {
        const response = await checkoutRepository(filter,)
        return response 
    } catch (error) {
        return error
    }
}

export default checkoutService