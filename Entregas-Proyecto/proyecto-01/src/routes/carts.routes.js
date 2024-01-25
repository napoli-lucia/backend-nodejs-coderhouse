const { Router } = require("express")

const ProductManager = require("../productManager");
const manager = new ProductManager("./src/carrito.json");

const router = Router();


module.exports = router;