const { Router } = require("express");

const router = Router();

// LOGOUT
router.get("/logout", async (req, res) => {
  const name = req.session.user;
  console.log("🚀 LOGOUT ~ name:", name)

  req.session.destroy((error) => {
    if (!error) return res.json({ message: `logout successfully` });
    return res.send({ message: `logout trouble`, body: error });
  });
  //la sesion esta almacenada dentro de mongo
  //el destroy destruye dentro del req.session
});

// WELCOME
//http://localhost:5000/api/session/welcome?name=luis
router.get("/welcome", async (req, res) => {
  const { name } = req.query;
  console.log("🚀 ~ router.get ~ name:", name)

  const counter = req.session?.counter;
  console.log("🚀 ~ router.get ~ counter:", counter)

  //La primera visita
  if (!counter) {
    req.session.counter = 1;
    req.session.user = name;
    req.session.admin = true;
    return res.send(`Bienvenido ${name} administrador`);
  }

  //Visita mas de una vez
  req.session.counter++;
  req.session.user = name;
  req.session.admin = true;
  return res.send(
    `visita numero ${req.session.counter} por el usuario ${name}`
  );
});

module.exports = router;