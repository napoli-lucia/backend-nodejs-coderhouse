const express = require("express");
const users = require("./users.json");

console.log("SERVIDOR EXPRESS");

const PORT = 6500;
//localhost:6500

const app = express();

const gendersAllow = ["f", "m"];

app.get("/", (req, res) => {
    res.send(`API LIVE ${PORT}!!!!`);
});


//Parametros en la url
app.get("/saludar/:nombre", (req, res) => {
    console.log("Parametros en el request", req.params);
    res.send(`API LIVE SAYING HELLO ${req.params.nombre}!!!!`);
});
//req.params son obligatorios
//se envian despues de la barra
//http://localhost:6500/saludar/lu --> { nombre: 'lu' }
/*
app.get("/saludar/:nombre/:apellido/:square", (req, res) => {
    console.log("Parametros en el request", req.params);
    const { nombre, apellido, square } = req.params; // req.params.nombre, req.params.apellido y req.params.square
    res.send(`API ALIVE SAYING HELLO ${nombre} ${apellido} ${square}!!!!`);
  });
*/

app.get("/bienvenida", (req, res) => {
    res.send(`<h1>HOLA SOY UNA PAGINA WEB</h1>`);
});

app.get("/usuario", (req, res) => {
    console.log("QUERY PARAMS", req.query);
    const { sexo, edad, color, hijos = "no" } = req.query;
    const user = users.usuarios[1];
    //res.json({message: "respondiendo un usuario", user});
    res.json({
        message: "respondiendo un usuario",
        user,
        sexo,
        edad,
        color,
        hijos
    });
});
//los queries params son parametros opcionales
//se envian despues del signo de interrogacion
//localhost:6500/usuario?sexo=masculino --> QUERY PARAMS { sexo: 'masculino' }
//http://localhost:6500/usuario?sexo=masculino&edad=20&color=moreno --> QUERY PARAMS { sexo: 'masculino', edad: '20', color: 'moreno' }
//{nombreVariable = value}
//si no paso un valor y no le defini un valor por defecto => undefined

//QUERY PARAMS { sexo: 'masculino', edad: '20', color: 'moreno' }
//QUERY PARAMS { sexo: 'masculino', edad: '20', color: 'moreno', hijos: 'si' }

/*
app.get("/usuarios", (req, res) => {
    console.log("QUERY PARAMS", req.query);
    const { sexo, edad, color, hijos = "no" } = req.query;
    console.log("🚀 ~ app.get ~ hijos:", hijos)
    const usersList = users.usuarios;

    const usersFilter = usersList.filter(
        (u) => u.genero === sexo.toLocaleLowerCase()
      );

    return res.json({
        message: "respondiendo usuarios", 
        usersFilter, 
        sexo, 
        edad, 
        color, 
        hijos
    });
});*/
app.get("/usuarios", (req, res) => {
    console.log("QUERY PARAMS", req.query);
    const { sexo, edad, color, hijos = "no" } = req.query;
    console.log("🚀 ~ http:app.get ~ hijos:", hijos);
    const usersList = users.usuarios;
    
    if (
        !sexo ||
        !gendersAllow.includes((!sexo ? "" : sexo).toLocaleLowerCase())
    ) {
        return res.json({
            message: "respondiendo todos los usuarios",
            users: usersList,
        });
    }

    const usersFilter = usersList.filter(
        (u) => u.genero === sexo.toLocaleLowerCase()
    );
    return res.json({
        message: "respondiendo usuarios",
        users: usersFilter,
        sexo,
        edad,
        color,
        hijos,
    });
});


app.listen(PORT, () => {
    console.log("SERVER UP AND RUNNING");
})