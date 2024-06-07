// creador de un registro de usuario anda todo ok
const selector = document.querySelector("#newUser");
selector.addEventListener("click", async () => {
  try {
    const data = {
      name: document.querySelector("#Name").value,
      email: document.querySelector("#Email").value,
      age: document.querySelector("#Age").value,
      password: document.querySelector("#Password").value,
      photo: document.querySelector("#Photo").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/auth/register", opts);
    response = await response.json();
    response.statusCode === 201
      ? location.replace("/users/login")
      : alert("ERROR: " + response.message);
  } catch (error) {
    alert(error.message);
  }
});
