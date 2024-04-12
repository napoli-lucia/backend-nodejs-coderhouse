import  { Router } from "express";

// import {ProductManager} from "../dao/filesystem/productManager.js";
// const manager = new ProductManager("./src/data/productos.json");
import {ProductManager} from "../dao/db/products.manager.js";
const manager = new ProductManager();

const router = Router();

router.get("/", (req, res) => {
    manager.getAllProducts().then( result => {
        res.render("home", {products: result})
        console.log("🚀 ~ manager.getProducts ~ result:", typeof(result))
    }).catch( err => {
        console.log("manager.getProducts ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    })
})

router.get("/realTimeProducts", (req, res) => {
    manager.getAllProducts().then( result => {
        res.render("realTimeProducts", {products: result})
    }).catch( err => {
        console.log("manager.getProducts ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    })
})

router.get("/chat", (req, res) => {
    res.render("chat", {})
})

//Vista products con paginacion y boton para agregar a carrito
router.get("/products", (req, res) => {
    const { page = 1, limit = 10, sort = null, query = null } = req.query;

    manager.getProducts(page, limit, sort, query).then( result => {
        //console.log("🚀 ~ manager.getProducts ~ result:", result)
        
        const myProducts = result.docs;
        console.log("🚀 ~ manager.getProducts ~ myProducts:", typeof(myProducts))
        
        res.render("products", {products: myProducts})
    }).catch( err => {
        console.log("manager.getProducts ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    })
})
  
export default router;