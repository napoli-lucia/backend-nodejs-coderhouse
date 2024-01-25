const express = require("express");
const productsRoutes = require("./routes/products.routes")
const cartsRoutes = require("./routes/carts.routes")

console.log("SERVIDOR EXPRESS");

const app = express();
const PORT = 8080;
const API_PREFIX = "api";


app.use(express.urlencoded({ extends: true }));
app.use(express.json());

app.get(`/${API_PREFIX}`, (req, res) => {
    res.send(`Bienvenido al manager de productos en el puerto ${PORT}!!!!`);
});


// PRODUCTS ROUTES
// /api/products
app.use(`/${API_PREFIX}/products`, productsRoutes)

// CARTS ROUTES
// /api/carts
app.use(`/${API_PREFIX}/carts`, cartsRoutes)


function serverErrors(error, req, res, next) {
    console.log(error);
    res.status(500).send('An internal server error occurred');
};

app.use(serverErrors);


app.listen(PORT, () => {
    console.log("SERVER UP AND RUNNING");
})