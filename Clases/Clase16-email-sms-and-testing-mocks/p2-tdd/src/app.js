import { login } from "./auth.login.js";

const user = {
  name: "coderUser",
  password: "123",
};

const isAuth = login(user.name, user.password);
console.log("🚀 ~ isAuth:", isAuth);