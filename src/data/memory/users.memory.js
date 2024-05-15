import crypto from "crypto";

class UserManager {
  static Users = [];

  create(data) {
    const NuevoUsuario = {
      id: crypto.randomBytes(12).toString("hex"),
      name: data.name,
      photo: data.photo,
      email: data.email,
    };
    UserManager.Users.push(NuevoUsuario);
    return NuevoUsuario;
  }

  read() {
    return UserManager.Users;
  }

  readOne(id) {
    return UserManager.Users.find((each) => each.id === Number(id));
  }

  destroy(id) {
    const index = UserManager.Users.findIndex((user) => user.id === id);

    if (index !== -1) {
      const deletedUser = UserManager.Users[index];
      UserManager.Users.splice(index, 1);
      return deletedUser;
    }

    return null;
  }

  update(id, data) {
    const index = UserManager.Users.findIndex((user) => user.id == id);

    if (index !== -1) {
      UserManager.Users[index] = {
        ...UserManager.Users[index],
        ...data,
        id: Number(id),
      };
      return UserManager.Users[index];
    }
    return null;
  }
}

const Usuarios = new UserManager();

Usuarios.create({
  name: "franco Maidana",
  photo: "foto random uno",
  email: "FrancoMaidana@gmail.com",
});

Usuarios.create({
  name: "Sofia Gomez",
  photo: "foto random dos",
  email: "SofiaGomez@gmail.com",
});

Usuarios.create({
  name: "Noelia Lopez",
  photo: "foto random tres",
  email: "NoeliaLopez@gmail.com",
});
