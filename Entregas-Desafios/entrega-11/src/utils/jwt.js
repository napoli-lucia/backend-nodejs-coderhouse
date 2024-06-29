import jwt from "jsonwebtoken";
import {SECRET_JWT} from "../config/config.js"

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