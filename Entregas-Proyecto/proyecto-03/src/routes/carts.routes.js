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
import authMdw from "../middleware/auth.middleware.js"

const router = Router();

// POST /api/carts/
router.post(`/`, authMdw(["USER"]), addCartCtrl);

// GET /api/carts/:cid
router.get(`/:cid`, authMdw(["USER"]), idErrors, getCartByIdCtrl);

// POST /api/carts/:cid/product/:pid
router.post(`/:cid/product/:pid`, authMdw(["USER"]), idErrors, addProductToCartCtrl);

// DELETE /api/carts/:cid/product/:pid
router.delete(`/:cid/product/:pid`, authMdw(["USER"]), idErrors, deleteProductInCartCtrl);

// DELETE /api/carts/:cid
router.delete(`/:cid`, authMdw(["USER"]), idErrors, deleteAllInCartCtrl);

// PUT /api/carts/:cid/product/:pid
router.put(`/:cid/product/:pid`, authMdw(["USER"]), idErrors, updateProductQuantityInCartCtrl);

// PUT /api/carts/:cid
router.put(`/:cid`, authMdw(["USER"]), idErrors, updateCartCtrl);

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