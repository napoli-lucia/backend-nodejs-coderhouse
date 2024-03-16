const { Router } = require("express");
const userModel = require("../model/user.model");
const { createHash, isValidPasswd } = require("../utils/encrypt");

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
      "🚀 ~ file: session.routes.js:17 ~ router.post ~ session:",
      session
    );

    const findUser = await userModel.findOne({ email });

    if (!findUser) return res.json({ message: `user not register` });

    const isValidComparePsw = await isValidPasswd(password, findUser.password);

    if (!isValidComparePsw) {
      return res.json({ message: `wrong password` });
    }
    //comparando literalmente las contraseñas
    // if (findUser.password !== password) {
    //   return res.json({ message: `wrong password` });
    // }

    // TODO: no es la mejor solucion, pensar en un pre mdl de mongo para mejorar esto
    delete findUser.password;
    req.session.user = {
      // TODO: eliminar el password
      ...findUser,
    };

    // **** **** 6798 ofuscar
    //mostrar solo una parte de los digitos

    return res.render("profile", {
      firstName: req.session?.user?.first_name || findUser.first_name,
      lastName: req.session?.user?.last_name || findUser.last_name,
      email: req.session?.user?.email || email,
      age: req.session?.user?.age || findUser.age,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:42 ~ router.post ~ error:",
      error
    );
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log("BODY REGISTER***", req.body);
    const { first_name, last_name, email, age, password } = req.body;

    //Password hasheada
    const pswHashed = await createHash(password);

    const addUser = {
      first_name,
      last_name,
      email,
      age,
      password: pswHashed,
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

router.post("/recover-psw", async (req, res) => {
  try {
    const { new_password, email } = req.body;
    console.log(
      "🚀 ~ file: session.routes.js ~ router.post ~ req.body:",
      req.body
    );

    const newPswHash = await createHash(new_password);
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: `credenciales invalidas o erroneas` });
    }

    //TODO agregar old password
    const updateUser = await userModel.findByIdAndUpdate(
      user._id, {password: newPswHash});

    if (!updateUser) {
      return res.json({ message: "problemas actualizando la contrasena" });
    }

    return res.render("login");
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js ~ router.post ~ error:",
      error
    );
  }
});

module.exports = router;