import { generateJWT } from "../utils/jwt.js";
import { userService } from "../repository/index.js";

// LOGOUT
const logoutCtrl = async (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.redirect("/login");
    return res.send({ message: `logout error`, body: err });
  });
};

// LOGIN
const loginCtrl = async (req, res, next) => {
  try {
    console.log("BODY LOGIN: ", req.body);
    const { email, password } = req.body;
    const session = req.session;
    console.log("🚀 ~ router.post ~ session:", session)

    const foundUser = await userService.getUser(email, password);
    if (foundUser.error) {
      return res.status(foundUser.code).json({
        status: foundUser.code,
        message: foundUser.error,
      });
    };

    const user = {
      first_name: foundUser.first_name,
      last_name: foundUser.last_name,
      email: foundUser.email,
      age: foundUser.age,
      role: foundUser.role,
      cart: foundUser.cart
    }

    // Con session
    req.session.user = user;
    //console.log("🚀 ~ router.post ~ req.session.user:", req.session.user)

    // Con jwt
    const token = await generateJWT(user);
    console.log("~ Token: ", token);

    return res
      .cookie("cookieToken", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
      })
      .redirect("/products");
  } catch (error) {
    next(error);
  }
};

// REGISTER
const registerCtrl = async (req, res, next) => {
  try {
    console.log("BODY REGISTER: ", req.body);
    const { first_name, last_name, email, age, password } = req.body;

    const result = await userService.addUser(first_name, last_name, email, age, password);

    if (result.error) {
      return res.status(500).json({
        status: 500,
        message: result.error,
      });
    }
    //console.log("🚀 ~ router.post ~ result:", result.message);

    // session del usuario
    // guardo info no sensible
    req.session.user = { first_name, last_name, email, age };
    //console.log("🚀 ~ router.post ~ req.session.user:", req.session.user)
    return res.redirect("/login");

  } catch (error) {
    next(error);
  }
};

// RECOVER PASSWORD
const recoverPswCtrl = async (req, res, next) => {
  try {
    console.log("BODY RECOVER: ", req.body);
    const { email, new_password } = req.body;
    const session = req.session;
    console.log("🚀 ~ router.post ~ session:", session)

    const foundUser = await userService.changePassword(email, new_password);
    if (foundUser.error) {
      return res.status(foundUser.code).json({
        status: foundUser.code,
        message: foundUser.error,
      });
    };

    return res.redirect("/login");

  } catch (error) {
    next(error);
  }
};

// LOGIN GITHUB
const githubCtrl = async (req, res) => { };

const githubCallbackCtrl = async (req, res) => {
  try {
    req.session.user = req.user;
    res.redirect("/products");
  } catch (error) {
    console.log("🚀 ~ error:", error)
  }
};

// CURRENT
const currentCtrl = async (req, res) => {
  console.log(" VALIDANDO REQ", req.user, req.cookies);
  return res.json({ message: `jwt en las cookies` });
};

export {
  logoutCtrl,
  loginCtrl,
  registerCtrl,
  recoverPswCtrl,
  githubCtrl,
  githubCallbackCtrl,
  currentCtrl
};