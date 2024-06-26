import  { Router } from "express";

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
        message: "all the products were inserted succesfully",
        products: result,
      });
    } catch (error) {
        next(error);
    }
});

// GET /api/products/
router.get(`/`, async (req, res, next) => {
    try {        
        if (req.query.limit) {    
            if (isNaN(req.query.limit) || Number(req.query.limit) < 0) {
                console.log("GET: Limit error");
                return res.status(400).json({
                    status: 400,
                    message: `this limit is not valid`,
                });
            }
            console.log(`Get ${req.query.limit} products`);
            return res.send({ products: await manager.getProducts(Number(req.query.limit))});
        };
        
        console.log("Get all products");
        return res.send({ products: await manager.getProducts()});

    } catch (error) {
        next(error);
    }
});

// GET /api/products/:pid
router.get(`/:pid`, idErrors, async (req, res, next) => {
    try {
        console.log(`Get product with id ${req.params.pid} `);

        const result = await manager.getProductById(Number(req.params.pid));
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
        console.log("Get param", req.params);

        const result = await manager.deleteProduct(Number(req.params.pid));
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
        const result = await manager.updateProduct(Number(req.params.pid), req.body);
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
    if (isNaN(req.params.pid) || Number(req.params.pid) < 0) {
        console.log("Id error");
        return res.status(400).json({
            status: 400,
            message: `this id is not valid`,
        });
    }
    next();
};

// function serverErrors(error, req, res, next) {
//     console.log(error);
//     res.status(500).send('An internal server error occurred');
// };

// router.use(serverErrors);

export default router;