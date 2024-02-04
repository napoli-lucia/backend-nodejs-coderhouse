const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");

const productsRoutes = require("./routes/products.routes")
const cartsRoutes = require("./routes/carts.routes")
const viewsRoutes = require("./routes/views.routes.js");

//const { Server } = require("socket.io");

console.log("SERVER");

const app = express();
const PORT = 8080;
const API_PREFIX = "api";

const httpServer = app.listen(PORT, () => console.log(`Server on port ${PORT}`))
//const io = new Server(httpServer);
const io = require("socket.io")(httpServer)


app.use(express.urlencoded({ extends: true }));
app.use(express.json());


// config handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));


app.get(`/${API_PREFIX}`, (req, res) => {
    res.send(`Bienvenido al manager de productos y carritos en el puerto ${PORT}!!!!`);
});


// PRODUCTS ROUTES
// /api/products
app.use(`/${API_PREFIX}/products`, productsRoutes)

// CARTS ROUTES
// /api/carts
app.use(`/${API_PREFIX}/carts`, cartsRoutes)

// VIEWS ROUTES
app.use("/", viewsRoutes);

function serverErrors(error, req, res, next) {
    console.log(error);
    res.status(500).send('An internal server error occurred');
};

app.use(serverErrors);


io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado: ", socket.id);
  
})