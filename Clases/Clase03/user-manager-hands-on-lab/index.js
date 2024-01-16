const path = require("path");
const UserManager = require("./managerUsuarios");

const projectUsers = async () => {
    console.log('INICIANDO EL PROYECTO MANEJADOR DE USUARIOS');
    try {
        //const pathBase = path.join(`${__dirname}/db.json`); //Otra forma
        const pathBase = path.join(__dirname, "db.json")
        const manager = new UserManager(pathBase);

        let users = await manager.getUsers();
        console.log("🚀 ~ projectUsers ~ users:", users);

        const addUser = {
            "nombre": "Artro",
            "apellido": "Hermida",
            "nombreUsuario": "ahermida",
            "contrasena": "123456"
        }
        const newUser = await manager.createUser(addUser);
        console.log("🚀 ~ projectUsers ~ newUser:", newUser);
        
        users = await manager.getUsers();
        console.log("🚀 ~ projectUsers ~ users:", users);

    } catch (error) {
        console.log("🚀 ~ projectUsers ~ error:", error);
    }
}

projectUsers();