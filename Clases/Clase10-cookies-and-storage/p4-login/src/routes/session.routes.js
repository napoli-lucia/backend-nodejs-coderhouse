const { Router } = require("express");
const userModel = require("../model/user.model");

const router = Router();

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.redirect("/login");
    return res.send({ message: `logout Error`, body: err });
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const session = req.session;
    console.log(
      "🚀 ~ file: session.routes.js ~ router.post ~ session:",
      session
    );

    const findUser = await userModel.findOne({ email });

    if (!findUser) return res.json({ message: `user not registered` });

    if (findUser.password !== password) {
      return res.json({ message: `wrong password` });
    }

    req.session.user = {
      // TODO: eliminar el password
      ...findUser,
    };

    return res.render("profile", {
      //esto es un or => con el ? vemos si es undefined => falsa y va a la otra
      firstName: req.session?.user?.first_name || findUser.first_name,
      lastName: req.session?.user?.last_name || findUser.last_name,
      email: req.session?.user?.email || email,
      age: req.session?.user?.age || findUser.age,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js ~ router.post ~ error:",
      error
    );
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log("BODY REGISTER***", req.body);
    const { first_name, last_name, email, age, password } = req.body;

    const addUser = {
      first_name,
      last_name,
      email,
      age,
      password,
    };

    // creando el usuario en mongo
    const newUser = await userModel.create(addUser); // promesa

    if (!newUser) {
      return res
        .status(500)
        .json({ message: `we have some issues registering this user` });
    }

    // session del usuario
    // guardo info no sensible
    req.session.user = { email, firstName: first_name, lastName: last_name };
    return res.redirect("/login");

  } catch (error) {
    // atrapa todos los reject de todas las promesas
    console.log(
      "🚀 ~ file: session.routes.js ~ router.post ~ error:",
      error
    );
  }
});

module.exports = router;