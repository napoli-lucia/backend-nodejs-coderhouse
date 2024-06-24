import  { Router } from "express";
import mongoose from "mongoose";
import {
    insertProductsCtrl, 
    getProductsCtrl,
    getProductByIdCtrl,
    deleteProductByIdCtrl,
    addProductCtrl,
    updateProductByIdCtrl
} from "../controller/products.controller.js"
import authMdw from "../middleware/auth.middleware.js"

const router = Router();

// GET /api/products/insertion
router.get(`/insertion`, authMdw(["ADMIN"]), insertProductsCtrl);

// GET /api/products/
// /api/products/?page=2&limit=5
// /api/products/?sort=asc
// /api/products/?query={categoria:Lacteos}
router.get(`/`, authMdw(["PUBLIC"]), getProductsCtrl);

// GET /api/products/:pid
router.get(`/:pid`, authMdw(["PUBLIC"]), idErrors, getProductByIdCtrl);

// DELETE /api/products/:pid
router.delete(`/:pid`, authMdw(["ADMIN"]), idErrors, deleteProductByIdCtrl);

// POST /api/products/
router.post(`/`, authMdw(["ADMIN"]), addProductCtrl);

// PUT /api/products/:pid
router.put(`/:pid`, authMdw(["ADMIN"]), idErrors, updateProductByIdCtrl);

//Funcion para chequear errores en id
function idErrors(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid)) {
        console.log("Id error");
        return res.status(400).json({
            status: 400,
            message: `this id is not valid`,
        });
    }
    next();
};


export default router;