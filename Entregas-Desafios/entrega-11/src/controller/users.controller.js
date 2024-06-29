import { generateJWT } from "../utils/jwt.js";
import { userService } from "../repository/index.js";

// LOGOUT
const logoutCtrl = async (req, res) => {
  req.session.destroy((err) => {
    if (!err){
      req.logger.info("Se cerró la sesión...")
      return res.redirect("/login")
    };
    req.logger.error(`logout error: ${err.message}`);
    return res.send({ message: `logout error`, body: err });
  });
};

// LOGIN
const loginCtrl = async (req, res, next) => {
  try {
    req.logger.info(`BODY LOGIN: ${JSON.stringify(req.body)}`);
    const { email, password } = req.body;
    
    const session = req.session;
    req.logger.info(`Session: ${JSON.stringify(session)}`);

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

    // Con jwt
    const token = await generateJWT(user);
    req.logger.info(`Token: ${token}`);

    return res
      .cookie("cookieToken", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
      })
      .redirect("/products");
  } catch (error) {
    req.logger.error(`${error.message}`);
    next(error);
  }
};

// REGISTER
const registerCtrl = async (req, res, next) => {
  try {
    req.logger.info(`BODY REGISTER: ${JSON.stringify(req.body)}`);
    const { first_name, last_name, email, age, password } = req.body;

    const result = await userService.addUser({first_name, last_name, email, age, password});

    if (result.error) {
      return res.status(500).json({
        status: 500,
        message: result.error,
      });
    }

    // session del usuario
    // guardo info no sensible
    req.session.user = { first_name, last_name, email, age };
    return res.redirect("/login");

  } catch (error) {
    req.logger.error(`${error.message}`);
    next(error);
  }
};

// RECOVER PASSWORD
const recoverPswCtrl = async (req, res, next) => {
  try {
    req.logger.info(`BODY RECOVER: ${JSON.stringify(req.body)}`);
    const { email, new_password } = req.body;

    const session = req.session;
    req.logger.info(`Session: ${JSON.stringify(session)}`);

    const foundUser = await userService.changePassword(email, new_password);
    if (foundUser.error) {
      return res.status(foundUser.code).json({
        status: foundUser.code,
        message: foundUser.error,
      });
    };

    return res.redirect("/login");

  } catch (error) {
    req.logger.error(`${error.message}`);
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
    req.logger.error(`${error.message}`);
  }
};

// CURRENT
const currentCtrl = async (req, res) => {
  req.logger.info(`VALIDANDO REQ
    User: ${JSON.stringify(req.user)}
    Cookies: ${JSON.stringify(req.cookies)}`);
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