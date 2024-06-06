const selector = document.querySelector("#login");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    //console.log(data);
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/login", opts);
    response = await response.json();
    console.log("ESTO ES RESPONSE", response);
    alert(response.message);
    if (response.statusCode === 200) {
      location.replace("/");
      // localStorage.setItem("token", response.token);
    }
  } catch (error) {
    alert(error.message);
  }
});

// git hub

const github = document.querySelector("#github");
github.addEventListener("click", async () => {
  try {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("/api/session/github", opts);
    response = await response.json();
    console.log(response);
    //alert(response.message);
    //response.session && location.replace("/");
  } catch (error) {
    alert(error.message);
  }
});
