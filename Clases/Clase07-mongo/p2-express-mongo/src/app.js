const express = require("express")
const studentsRoutes = require("./routes/students.routes")

const app = express()
const PORT = 5000;
const API_PREFIX = "api";

app.use(express.urlencoded({ extends: true }));
app.use(express.json());

//http://localhost:5000/static/index.html
app.use(`/static`, express.static(__dirname + "/public"));


//STUDENTS ROUTES
// /api/users
app.use(`/${API_PREFIX}/students`, studentsRoutes)


app.listen(PORT, () => {
    console.log(`UP AND RUNNING ON PORT: ${PORT}`);
  });