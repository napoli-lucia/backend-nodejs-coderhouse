import usersModel from "../models/users.model.js"

class UserManager{
    constructor(path) {
		this.path = path;
	}

	async getUser(email, password){
        try {
            const findUser = await usersModel.findOne({"email": email });
            //console.log("🚀 ~ UserManager ~ getUser ~ findUser:", findUser)

            if (!findUser) return { error: `usuario no registrado` };

            if (findUser.password !== password) return { error: `contrasena incorrecta` };

            return findUser;

        } catch (error) {
            throw new Error(`No se pueden obtener al usuario\n ${error.message}`);
        }
    }

	async addUser(first_name, last_name, email, age, password){
        try {
            const newUser = await usersModel.create({first_name, last_name, email, age, password});
            if(email==="adminCoder@coder.com" && password==="adminCod3r123"){
                await usersModel.updateOne({"email": email}, {$set: {"role": "admin"}})
            }
            return {message: `Nuevo usuario agregado: ${newUser}`};
            
        } catch (error) {
            throw new Error(`No se puede agregar al usuario\n ${error.message}`);
        }
    }
}

export {UserManager};