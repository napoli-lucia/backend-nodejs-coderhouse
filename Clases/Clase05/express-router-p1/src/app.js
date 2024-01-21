const express = require("express")
const usersRoutes = require("./routes/users.routes")
const petsRoutes = require("./routes/pets.routes")

const app = express()
const PORT = 5000;
const API_PREFIX = "api";

app.use(express.urlencoded({ extends: true }));
app.use(express.json());

app.use(express.static("public"))


//USERS ROUTES
// /api/users
app.use(`/${API_PREFIX}/users`, usersRoutes)
/*
app.get(`/${API_PREFIX}/users`, (req,res) => {
    return res.json({
        ok: true,
        users: userList
    })
})*/

//PETS ROUTES
// /api/pets
app.use(`/${API_PREFIX}/pets`, petsRoutes)
/*app.get(`/${API_PREFIX}/pets`, (req,res) => {
    return res.json({
        ok: true,
        users: petsList
    })
})*/





app.listen(PORT, () => {
    console.log(`UP AND RUNNING ON PORT: ${PORT}`);
  });