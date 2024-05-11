import  { Router } from "express";
import mongoose from "mongoose";

//import {ProductManager} from "../dao/filesystem/productManager.js";
//const manager = new ProductManager("./src/data/productos.json");
import {ProductManager} from "../dao/db/products.manager.js";
const manager = new ProductManager();
import {UniqueError} from "../handle-errors/uniqueError.js"

const router = Router();

// GET /api/products/insertion
router.get(`/insertion`, async (req, res) => {
    try {
      let result = await manager.insertProducts();
      return res.json({
        status: "success",
        message: "all the products were inserted succesfully",
        products: result,
      });
    } catch (error) {
        next(error);
    }
});

// GET /api/products/
// /api/products/?page=2&limit=5
// /api/products/?sort=asc
// /api/products/?query={categoria:Lacteos}
router.get(`/`, async (req, res, next) => {
    try {
        console.log("GET products - req.query:", req.query)

        //TODO Chequeo de queries validas
        if (req.query.limit && isNaN(req.query.limit) || Number(req.query.limit) < 0) {
            console.log("GET: Limit error");
            return res.status(400).json({
                status: "error",
                message: "this limit is not valid",
            });
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        
        const sort = req.query.sort === 'Ascendente' ? 1 
        : req.query.sort === 'Descendente' ? -1 
        : null;
        

        const query = req.query.query || null;
        //console.log("🚀 ~ router.get ~ query:", query)

        let queryObj = {}
        if(query != undefined && query != 'null' ){
            let queryArr = query.split(":");
            queryObj[queryArr[0]] = queryArr[1];
        }

        const result = await manager.getProducts(page, limit, queryObj, sort);

        return res.status(200).json({
            status: "success",
            ...result,
            prevLink: result.hasPrevPage ? `/api${result.prevLink}` : null,
            nextLink: result.hasNextPage ? `/api${result.nextLink}` : null
        })

    } catch (error) {
        next(error);
    }
});

// GET /api/products/:pid
router.get(`/:pid`, idErrors, async (req, res, next) => {
    try {
        console.log(`Get product with id ${req.params.pid} `);

        const result = await manager.getProductById(req.params.pid);
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

// DELETE /api/products/:pid
router.delete(`/:pid`, idErrors, async (req, res, next) => {
    try {
        console.log(`Delete product with id ${req.params.pid} `);

        const result = await manager.deleteProduct(req.params.pid);
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

// POST /api/products/
router.post(`/`, async (req, res, next) => {
    try {
        const product = req.body;

        const result = await manager.addProduct(product);
        if (result.error) {
            return res.status(400).json({
                status: 400,
                message: result.error,
            });
        };
        return res.status(200).json({
            status: 200,
            message: result.message,
        });

    } catch (error) {
        if (error instanceof UniqueError) {
            return res.status(400).json({
                status: 400,
                message: error.message,
            });
        }
        next(error);
    }
});

// PUT /api/products/:pid
router.put(`/:pid`, idErrors, async (req, res, next) => {
    try {
        console.log(`Edit product with id ${req.params.pid} `);

        const result = await manager.updateProduct(req.params.pid, req.body);
        if (result.error) {
            return res.status(404).json({
                status: 404,
                message: result.error,
            });
        };
        return res.status(200).json({
            status: 200,
            message: result.message,
        });

    } catch (error) {
        next(error);
    }
});

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