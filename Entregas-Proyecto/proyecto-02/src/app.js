import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";

import productsRoutes from "./routes/products.routes.js"
import cartsRoutes from "./routes/carts.routes.js"
import viewsRoutes from "./routes/views.routes.js"
import socketProducts from "./listeners/socketProducts.js";
import socketChat from "./listeners/socketChat.js";

import mongoose from "mongoose";
import displayRoutes from "express-routemap";

console.log("SERVER");
const app = express();
const PORT = 8080;
const API_PREFIX = "api";

const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "ecommerce";
const MONGO_URI = 'mongodb+srv://user:password@codercluster.2ms9a6h.mongodb.net/';

const connection = mongoose
    //.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
    .connect(MONGO_URI, {
     dbName: `${DB_NAME}`,
    })
    .then((conn) => {
      console.log("CONNECTED TO MONGO, WELCOME!!!");
    })
    .catch((err) => {
      console.log("ERROR CONNECTION!!!", err);
});

const httpServer = app.listen(PORT, () => {
    displayRoutes(app);
    console.log(`Server running on port ${PORT}`)});

const io = new Server(httpServer);

app.use(express.urlencoded({ extends: true }));
app.use(express.json());


// config handlebars
app.engine("handlebars", handlebars.engine());
app.set('views', __dirname + '/views');
app.set("view engine", "handlebars");

app.use(express.static(__dirname + '/public'));

app.use(express.static("images")); 

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
    return res.status(500).json({
        status: "error",
        message: "An internal server error occurred"
    })
};

app.use(serverErrors);


socketProducts(io);
socketChat(io);