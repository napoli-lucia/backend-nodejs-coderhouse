const express = require("express")
const mongoose = require("mongoose");
const studentsRoutes = require("./routes/students.routes")

const app = express()
const PORT = 5000;
const API_PREFIX = "api";

const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "mongoStudentDB";

app.use(express.urlencoded({ extends: true }));
app.use(express.json());

//http://localhost:5000/static/index.html
app.use(`/static`, express.static(__dirname + "/public"));

//El metodo connect es una promesa
//Para operar una promesa tengo que usar then (resolve) y catch (reject)
const connection = mongoose
    .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
    .then((conn) => {
      console.log("CONNECTED TO MONGO, WELCOME!!!");
    })
    .catch((err) => {
      console.log("ERROR CONNECTION!!!", err);
    });


//STUDENTS ROUTES
// /api/users
app.use(`/${API_PREFIX}/students`, studentsRoutes)


app.listen(PORT, () => {
    console.log(`UP AND RUNNING ON PORT: ${PORT}`);
  });