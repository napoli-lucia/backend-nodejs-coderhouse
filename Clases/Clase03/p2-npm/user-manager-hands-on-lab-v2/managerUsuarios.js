const fs = require('fs/promises');
const bcrypt = require("bcryptjs");
const Joi = require("joi");

class userManager {
    constructor(path) {
        this.pathDB = path; 
    }

    async createUser(user) {
        try {
            // valido si la informacion del usuario es correcta
            const validation = await this.validateUser(user);
            const { error, value } = validation;
            console.log("🚀 ~ userManager ~ createUser ~ value:", value)
            console.log("🚀 ~ userManager ~ createUser ~ error:", error)
            //joi retorna dos cosas: el error y el valor si lo tiene correctamente

            if (err) {
                return null;
              }


            const { nombre, apellido, nombreUsuario, contrasena } = user;

            const allUsers = await this.getUsers();
            const lastId =
                allUsers.length === 0
                ? 1
                : allUsers.usuarios[allUsers.usuarios.length - 1].id + 1;
                
            // encriptacion
            const salt = await bcrypt.genSalt();
            let contrasenaEncripted = await bcrypt.hashSync(contrasena, salt);

            const userToInsert = {
                nombre,
                apellido,
                nombreUsuario,
                contrasena: contrasenaEncripted,
            };

            const newUser = { id: lastId, ...userToInsert };

            allUsers.usuarios.push(newUser);
            await fs.writeFile(this.pathDB, JSON.stringify(allUsers));

            return newUser;

        } catch (error) {
            console.log("🚀 ~ userManager ~ createUser ~ error:", error);
        }
    }

    async getUsers() {
        try {
            const allUsers = await fs.readFile(this.pathDB);
            return JSON.parse(allUsers);
        } catch (error) {
            console.log("🚀 ~ userManager ~ getUsers ~ error:", error);
        }
    }


    async validateUser(usuario) {
        try {
          // Contraseña: Mínimo 8 caracteres, al menos una letra y un número
          const schema = Joi.object({
            nombre: Joi.string().required(),
            apellido: Joi.string().required(),
            nombreUsuario: Joi.string().required(),
            contrasena: Joi.string().min(6).alphanum().required(),
          });
    
          return await schema.validateAsync(usuario);
        } catch (error) {
          throw new Error(error);
        }
      }
}


//con esto hacemos que la clase se puede cargar en otro archivo
module.exports = userManager; 