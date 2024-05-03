import  { Router } from "express";

// import {ProductManager} from "../dao/filesystem/productManager.js";
// const manager = new ProductManager("./src/data/productos.json");
import {ProductManager} from "../dao/db/products.manager.js";
const productManager = new ProductManager();
import {CartManager} from "../dao/db/carts.manager.js";
const cartManager = new CartManager();

const router = Router();

router.get("/", (req, res) => {
    productManager.getAllProducts().then( result => {
        res.render("home", {products: result})
        //console.log("🚀 ~ productManager.getProducts ~ result:", typeof(result))
    }).catch( err => {
        console.log("productManager.getProducts ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    })
})

router.get("/realTimeProducts", (req, res) => {
    productManager.getAllProducts().then( result => {
        res.render("realTimeProducts", {products: result})
    }).catch( err => {
        console.log("productManager.getProducts ~ err:", err);
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

    productManager.getProducts(page, limit, sort, query).then( result => {
        console.log("🚀 ~ productManager.getProducts ~ result:", result)
        
        res.render("products", {
            products: result.payload,
            prevLink: result.prevLink,
            nextLink: result.nextLink,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage
        })
    }).catch( err => {
        console.log("productManager.getProducts ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    })
})


//Vista de un carrito
router.get("/carts/:cid", (req, res) => {
    const cid = req.params.cid;

    cartManager.getCartById(cid).then( result => {
        res.render("cart", {products: result[0].products})
        //console.log("🚀 ~ cartManager.getProducts ~ result:", result[0]);
        console.log("🚀 ~ cartManager.getCartById ~ result.products:", result[0].products)
    }).catch( err => {
        console.log("cartManager.getProducts ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    })
})
  
export default router;