const { Router } = require("express");

const router = Router();

// LOGIN
router.get("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("🚀 ~ file: session.routes.js:7 ~ router.get ~ BODY:", req.body);

  // si le preguntaramos en la BD si el usuario existe
  if (username !== "rabin" && password !== "123456") {
    return res.json({ message: `login fallido` });
  }
  //console.log("Se cumple: ",username !== "rabin" && password !== "123456")

  req.session.user = username;
  req.session.admin = true;
  console.log(
    "🚀 ~ file: session.routes.js:15 ~ router.get ~ req.session:",
    req.session
  );

  return res.json({ message: "login success" });
});


// LOGOUT
router.get("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (!error) return res.json({ message: `logout successfully` });
    return res.send({ message: `logout trouble`, body: error });
  });
});


// WELCOME
//http://localhost:5000/api/session/welcome?name=luis
router.get("/welcome", async (req, res) => {
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