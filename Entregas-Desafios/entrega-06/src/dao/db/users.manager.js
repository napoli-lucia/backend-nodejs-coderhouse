import usersModel from "../models/users.model.js"

class UserManager{
    constructor(path) {
		this.path = path;
	}

	// async getUser(){
    //     try {
    //         return await usersModel.find({}).lean();
    //     } catch (error) {
    //         throw new Error(`No se pueden obtener los mensajes\n ${error.message}`);
    //     }
    // }

	async addUser(first_name, last_name, email, age, password){
        try {
            
            const newUser = await usersModel.create({first_name, last_name, email, age, password});
            return {message: `Nuevo usuario agregado: ${newUser}`};
            
        } catch (error) {
            throw new Error(`No se puede agregar al usuario\n ${error.message}`);
        }
    }
}

export {UserManager};