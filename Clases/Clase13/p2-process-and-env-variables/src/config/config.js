const dotenv = require("dotenv");

// dotenv.config();
// console.log("variales de entorno ", process.env);

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
//si pongo .local tengo agregar eso en los archivos .env

console.log(`RUTA DE ENV**** .env.${process.env.NODE_ENV || "development"}`);


const { JWT_EXPIRE_IN, PORT, DB_HOST, DB_PORT, DB_NAME, NODE_ENV } =
  process.env;

module.exports = {
  JWT_EXPIRE_IN,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  NODE_ENV,
};