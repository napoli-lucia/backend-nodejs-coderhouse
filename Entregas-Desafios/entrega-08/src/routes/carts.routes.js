import  { Router } from "express";
import mongoose from "mongoose";

// import {CartManager} from "../dao/filesystem/cartManager.js";
// const manager = new CartManager("./src/data/carrito.json");
import {CartManager} from "../dao/db/carts.manager.js";
const manager = new CartManager();

const router = Router();

// POST /api/carts/
// Crea un nuevo carrito
router.post(`/`, async (req, res, next) => {
    try {
        const result = await manager.addCart();
        if (result.error) {
            return res.status(400).json({
                status: 400,
                message: result.error,
            });
        }
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
router.get(`/:cid`, idErrors, async (req, res, next) => {
    try {
        console.log(`Get cart with id ${req.params.cid}`);
        const result = await manager.getCartById(req.params.cid);
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
router.post(`/:cid/product/:pid`, idErrors, async (req, res, next) => {
    try {
        const result = await manager.addProductToCart(req.params.cid, req.params.pid);
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

// DELETE /api/carts/:cid/product/:pid
// Eliminar el producto seleccionado de un carrito determinado
router.delete(`/:cid/product/:pid`, idErrors, async (req, res, next) => {
    try {
        const result = await manager.deleteProductInCart(req.params.cid, req.params.pid);
        if (result.error) {
            return res.status(404).json({
                status: 404,
                message: result.error,
            });
        }
        return res.status(200).json({
            status: 200,
            message: result.message,
        });

    } catch (error) {
        next(error);
    }
});

// DELETE /api/carts/:cid
// Eliminar todos los productos del carrito seleccionado
router.delete(`/:cid`, idErrors, async (req, res, next) => {
    try {
        const result = await manager.deleteAllInCart(req.params.cid);
        if (result.error) {
            return res.status(404).json({
                status: 404,
                message: result.error,
            });
        }
        return res.status(200).json({
            status: 200,
            message: result.message,
        });

    } catch (error) {
        next(error);
    }
});

// PUT /api/carts/:cid/product/:pid
// Actualizar solo la cantidad dada de ejemplares del producto
router.put(`/:cid/product/:pid`, idErrors, async (req, res, next) => {
    try {
        const result = await manager.updateProductQuantityInCart(req.params.cid, req.params.pid, req.body.quantity);
        if (result.error) {
            return res.status(404).json({
                status: 404,
                message: result.error,
            });
        }
        return res.status(200).json({
            status: 200,
            message: result.message,
        });

    } catch (error) {
        next(error);
    }
});


// PUT /api/carts/:cid
// Actualizar carrito con arreglo de productos
router.put(`/:cid`, idErrors, async (req, res, next) => {
    try {
        console.log("🚀 ~ router.put ~ req.body:", req.body)
        const result = await manager.updateCart(req.params.cid, req.body);
        if (result.error) {
            return res.status(404).json({
                status: 404,
                message: result.error,
            });
        }
        return res.status(200).json({
            status: 200,
            message: result.message,
        });

    } catch (error) {
        next(error);
    }
});

//Funcion para chequear errores en id's
function idErrors(req, res, next) {
    if (req.params.pid && !mongoose.Types.ObjectId.isValid(req.params.pid)) {
        console.log("Product id error");
        return res.status(400).json({
            status: 400,
            message: `Product id is not valid`,
        });
    }
    if (req.params.cid && !mongoose.Types.ObjectId.isValid(req.params.cid)) {
        console.log("Cart id error");
        return res.status(400).json({
            status: 400,
            message: `Cart id is not valid`,
        });
    }
    next();
};

export default router;