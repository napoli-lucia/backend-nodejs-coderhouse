import path from "path";
import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";

const PORT = 3000;
const app = express();


app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "../public")));

/*
app.get("/", (req, res) => {
    res.render("index");
})*/










app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});