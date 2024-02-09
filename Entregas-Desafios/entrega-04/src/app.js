import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";

import productsRoutes from "./routes/products.routes.js"
import cartsRoutes from "./routes/carts.routes.js"
import viewsRoutes from "./routes/views.routes.js"

import {ProductManager} from "./managers/productManager.js";
const manager = new ProductManager("./src/productos.json");


console.log("SERVER");
const app = express();
const PORT = 8080;
const API_PREFIX = "api";

const httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
const io = new Server(httpServer);
//const io = require("socket.io")(httpServer)
//const { Server } = require("socket.io");

app.use(express.urlencoded({ extends: true }));
app.use(express.json());


// config handlebars
app.engine("handlebars", handlebars.engine());
//app.set("views", path.join(`${__dirname}/views`));
app.set('views', __dirname + '/views');
app.set("view engine", "handlebars");

app.use(express.static(__dirname + '/public'));
console.log("🚀 ~ __dirname:", __dirname)


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


io.on("connection", async (socket) => {
    console.log("Cliente conectado: ", socket.id);

    const listadeproductos = await manager.getProducts();
    socket.emit("real-products",listadeproductos)
    
    socket.on("create-prod", async (data) => {
        console.log("🚀 ~ socket.on ~ data:", data)
        await manager.addProduct(data);
        
        const listadeproductos = await manager.getProducts();
        socket.emit("real-products",listadeproductos)
    })

    socket.on("delete-prod", async (pid) => {
        //console.log("🚀 ~ socket.on ~ data:", data)
        await manager.deleteProduct(pdi);
        
        listadeproductos = await manager.getProducts();
        socket.emit("real-products",listadeproductos)
    })
  
})