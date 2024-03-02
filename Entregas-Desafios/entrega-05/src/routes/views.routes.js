import  { Router } from "express";

import {ProductManager} from "../dao/filesystem/productManager.js";
const manager = new ProductManager("./src/data/productos.json");

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
  
export default router;