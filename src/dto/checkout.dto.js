class CheckoutProduct {
  constructor(data, price, title, quantity) {
    this.price_data = {
      product_data: {
        name: title, // Asegúrate de que el título esté dentro de un objeto con un campo name
      },
      currency: "usd",
      unit_amount: price * 100, // Convertir el precio a centavos de dólar
    };
    this.quantity = quantity;
  }
}

export default CheckoutProduct;
