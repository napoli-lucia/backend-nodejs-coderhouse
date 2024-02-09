//const { Router } = require("express")
import  { Router } from "express";

//const ProductManager = require("../managers/productManager");
import {ProductManager} from "../managers/productManager.js";
const manager = new ProductManager("./src/productos.json");

const router = Router();

router.get("/", (req, res) => {
    manager.getProducts().then( result => {
        res.render("home", {products: result.products})
    }).catch( err => {
        console.log("manager.getProducts ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    })
})

router.get("/realTimeProducts", (req, res) => {
    //res.render("realTimeProducts")
    manager.getProducts().then( result => {
        res.render("realTimeProducts", {products: result.products})
    }).catch( err => {
        console.log("manager.getProducts ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    })
})
  
//module.exports = router;
export default router;