const { Router } = require("express");

const router = Router();

router.get("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("🚀 ~ file: session.routes.js:7 ~ router.get ~ BODY:", req.body);

  // si le preguntaramos en la BD si el usuario existe
  if (username !== "rabin" && password !== "123456") {
    return res.json({ message: `login fallido` });
  }

  req.session.user = username;
  req.session.admin = true;
  console.log(
    "🚀 ~ file: session.routes.js:15 ~ router.get ~ req.session:",
    req.session
  );

  return res.json({ message: "login success" });
});

router.get("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (!error) return res.json({ message: `logout successfully` });
    return res.send({ message: `logout trouble`, body: error });
  });
});

router.get("/welcome", async (req, res) => {
  // localhost:5000/api/session/welcome?name=luis
  const { name } = req.query;
  console.log("🚀 ~ file: session.routes.js:8 ~ router.get ~ name:", name);

  const counter = req.session?.counter;
  console.log(
    "🚀 ~ file: session.routes.js:11 ~ router.get ~ counter:",
    counter
  );

  //La primera visita
  if (!counter) {
    req.session.counter = 1;
    return res.send(`Bienvenido ${name}`);
  }

  //Visita mas de una vez
  req.session.counter++;
  return res.send(
    `visita numero ${req.session.counter} por el usuario ${name}`
  );
});

module.exports = router;