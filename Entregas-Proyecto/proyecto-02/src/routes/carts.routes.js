import  { Router } from "express";

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

// DELETE /api/carts/:cid/product/:pid
// Eliminar el producto seleccionado de un carrito determinado
router.delete(`/:cid/product/:pid`, async (req, res, next) => {
    try {
        const cid = Number(req.params.cid);
        const pid = Number(req.params.pid);

        const result = await manager.deleteProductToCart(cid, pid);
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
router.delete(`/:cid`, async (req, res, next) => {
    try {
        const result = await manager.deleteAllInCart(Number(req.params.cid));
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
router.put(`/:cid/product/:pid`, async (req, res, next) => {
    try {
        const cid = Number(req.params.cid);
        const pid = Number(req.params.pid);

        const result = await manager.updateProductQuantityInCart(cid, pid, req.body.quantity);
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
router.put(`/:cid`, async (req, res, next) => {
    try {
        console.log("🚀 ~ router.put ~ req.body:", req.body)
        const result = await manager.updateCart(Number(req.params.cid), req.body);
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

export default router;