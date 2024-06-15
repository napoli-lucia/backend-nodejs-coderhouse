import jwt from "jsonwebtoken";
import 'dotenv/config'

const SECRET_JWT = process.env.SECRET_JWT;

const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ user }, SECRET_JWT, { expiresIn: "30m" }, (err, token) => {
      if (err) {
        console.log("🚀 ~ jwt.sign ~ err:", err)
        reject("can not generate jwt token");
      }
      resolve(token);
    });
  });
};

export {
  SECRET_JWT,
  generateJWT,
};