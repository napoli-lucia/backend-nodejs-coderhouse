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
            "nombre": "Luis",
            "apellido": "Bravo",
            "nombreUsuario": "lbravo",
            "contrasena": "123456"
        }
        const addUser2 = {
            "nombre": "Luis2",
            "apellido": "Bravo2",
            "nombreUsuario": "l2bravo2"
        }
        
        const newUser = await manager.createUser(addUser2);
        console.log("🚀 ~ projectUsers ~ newUser:", newUser);

        if (!newUser) {
            console.log("NO SE PUDO CREAR EL USUARIO, DATOS ERRADOS");
          }
        
        users = await manager.getUsers();
        console.log("🚀 ~ projectUsers ~ users:", users);

    } catch (error) {
        console.log("🚀 ~ projectUsers ~ error:", error);
    }
}

projectUsers();