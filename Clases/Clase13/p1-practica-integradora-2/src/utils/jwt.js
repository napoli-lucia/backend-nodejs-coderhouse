const jwt = require("jsonwebtoken");

const SECRET_JWT = "CLAVEs3p3rs3cr3t4S1s1";

//jwt nos va a generar un token
const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    //le mandamos info que junto con la configuracion va a generar un token de sesion
    jwt.sign({ user }, SECRET_JWT, { expiresIn: "30m" }, (err, token) => {
      if (err) {
        console.log(err);
        reject("can not generate jwt token");
      }
      resolve(token);
    });
  });
};

module.exports = {
  generateJWT,
  SECRET_JWT,
};