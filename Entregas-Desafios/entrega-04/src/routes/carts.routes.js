//const { Router } = require("express")
import  { Router } from "express";

//const CartManager = require("../managers/cartManager");
import {CartManager} from "../managers/cartManager.js";
const manager = new CartManager("./src/databases/carrito.json");

const router = Router();

// POST /api/carts/
// Crea un nuevo carrito
router.post(`/`, async (req, res, next) => {
    try {
        const result = await manager.addCart();

        return res.status(200).json({
            status: 200,
            message: result.message,
        });

    } catch (error) {
        next(error);
    }
});

// GET /api/carts/:cid
// Listar los productos que pertenezcan al carrito con el parámetro cid
router.get(`/:cid`, async (req, res, next) => {
    try {
        console.log(`Get cart with id ${req.params.cid} `);

        const result = await manager.getCartById(Number(req.params.cid));
        if (result.error) {
            return res.status(404).json({
                status: 404,
                message: result.error,
            });
        }
        return res.send(result);

    } catch (error) {
        next(error);
    }
});

// POST /api/carts/:cid/product/:pid
// Agregar el producto al carrito seleccionado
router.post(`/:cid/product/:pid`, async (req, res, next) => {
    try {
        const cid = Number(req.params.cid);
        const pid = Number(req.params.pid);

        const result = await manager.addProductToCart(cid, pid);
        if (result.error) {
            return res.status(404).json({
                status: 404,
                message: result.error,
            });
        }
        return res.send(result);

    } catch (error) {
        next(error);
    }
});

//module.exports = router;
export default router;