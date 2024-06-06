const selector = document.querySelector("#newProduct");
selector.addEventListener("click", async () => {
  try {
    const data = {
      title: document.querySelector("#Title").value,
      photo: document.querySelector("#Photo").value,
      price: document.querySelector("#Price").value,
      stock: document.querySelector("#Stock").value,
    };
    console.log(data);
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/products/real", opts); // Espera a que se resuelva la promesa
    response = await response.json(); // Convierte la respuesta a JSON
    // console.log(response);
    alert(response.message);
    response.session && location.replace("/products");
  } catch (error) {
    alert(error.message);
  }
});
