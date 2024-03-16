const bcrypt = require("bcrypt");
//Esta libreria esta basada en promesas, tiene metodos asincronos y sincronos.
//vamos a usar metodos asincronos

//Retornar un hash ya creado
const createHash = async (psw) => {
    //var de salto, que tan robusto es el algoritmo de hasheo
  const salt = await bcrypt.genSalt(); //es asincrono
  //por defecto tiene valor 10
  return await bcrypt.hashSync(psw, salt);
  //psw que nos pasa el usuario
};

//Retornar si el password es valido o no
const isValidPasswd = async (psw, encryptedPsw) => {
  const isValid = await bcrypt.compareSync(psw, encryptedPsw)
  return isValid;
};

module.exports = {
  createHash,
  isValidPasswd,
};