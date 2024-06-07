  import Stripe from "stripe";
  import CheckoutProduct from "../dto/checkout.dto.js";
  import dao from "../data/index.factory.js";
  const {ordenes} = dao


  const stripe = new Stripe(process.env.SECRET_KEY_STRIPE);
  const checkoutRepository = async (filter) => {
  try {
    let productsOnCart = await ordenes.read(filter);


    const line_items = productsOnCart.docs.map((product) => {
      const productId = product.products_id;
      const quantity = product.quantity;
      const title = productId.title;
      const price = productId.price;
      return new CheckoutProduct(product, price, title, quantity);
    });
    const mode = "payment";
    const success_url = "http://localhost:8080/";
    const intent = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
    });
    return intent;
  } catch (error) {
    throw error;
  }
};


  export default checkoutRepository;
