const express = require("express")
const mongoose = require("mongoose");
const displayRoutes = require("express-routemap");
const studentsRoutes = require("./routes/students.routes")

const app = express()
const PORT = 5000;
const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "mongoStudentDB08";

app.use(express.json());
app.use(express.urlencoded({ extends: true }));


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
app.use(`/api/students`, studentsRoutes)


app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Listening on port: ${PORT}`);
  });