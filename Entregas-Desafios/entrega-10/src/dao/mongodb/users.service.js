import usersModel from "../models/users.model.js"
import { createHash, isValidPasswd } from "../../utils/encrypt.js"
import { cartService } from "../../repository/index.js";

class UserServiceDao{

	async getUser(email, password){
        try {
            if(email==="adminCoder@coder.com" && password==="adminCod3r123"){
                return {email, role: "ADMIN"}
            }

            const findUser = await usersModel.findOne({ email });

            if (!findUser) return { error: `usuario no registrado`, code: 400 };

            const isValidComparePsw = await isValidPasswd(password, findUser.password);

            if (!isValidComparePsw) return { error: `contrasena incorrecta`, code: 403 };

            console.log("🚀 ~ UserServiceDao ~ getUser ~ findUser:", findUser);
            return findUser;

        } catch (error) {
            throw new Error(`No se pueden obtener al usuario\n ${error.message}`);
        }
    }

	async addUser(user){
        try {
            const { first_name, last_name, email, age, password } = user;
            const pswHashed = await createHash(password);

            const newCart = await cartService.addCart();
            console.log("🚀 ~ UserServiceDao ~ addUser ~ newCart:", newCart);

            const newUser = await usersModel.create({
                first_name, 
                last_name, 
                email, 
                age, 
                password: pswHashed,
                cart: newCart.cart
            });
            console.log("🚀 ~ UserServiceDao ~ addUser ~ newUser:", newUser);

            return {message: `Nuevo usuario agregado`, user: newUser};
            
        } catch (error) {
            throw new Error(`No se puede registar al usuario\n ${error.message}`);
        }
    }

    async changePassword(email, new_password){
        const findUser = await usersModel.findOne({ email });

        if (!findUser) return { error: `credenciales invalidas o erroneas`, code: 401 };

        const newPswHash = await createHash(new_password);

        const updateUser = await usersModel.findByIdAndUpdate(
            findUser._id, {password: newPswHash});
      
        if (!updateUser) {
            return { error: "problemas actualizando la contrasena", code: 404 };
        }

        return {message: `Contraseña cambiada!`}

    }
}

export default UserServiceDao;