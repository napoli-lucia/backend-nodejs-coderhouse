import  { Router } from "express";
import mongoose from "mongoose";

import {
    addCartCtrl,
    getCartByIdCtrl,
    addProductToCartCtrl,
    deleteProductInCartCtrl,
    deleteAllInCartCtrl,
    updateProductQuantityInCartCtrl,
    updateCartCtrl
} from "../controller/carts.controller.js"

const router = Router();

// POST /api/carts/
router.post(`/`, addCartCtrl);

// GET /api/carts/:cid
router.get(`/:cid`, idErrors, getCartByIdCtrl);

// POST /api/carts/:cid/product/:pid
router.post(`/:cid/product/:pid`, idErrors, addProductToCartCtrl);

// DELETE /api/carts/:cid/product/:pid
router.delete(`/:cid/product/:pid`, idErrors, deleteProductInCartCtrl);

// DELETE /api/carts/:cid
router.delete(`/:cid`, idErrors, deleteAllInCartCtrl);

// PUT /api/carts/:cid/product/:pid
router.put(`/:cid/product/:pid`, idErrors, updateProductQuantityInCartCtrl);

// PUT /api/carts/:cid
router.put(`/:cid`, idErrors, updateCartCtrl);

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