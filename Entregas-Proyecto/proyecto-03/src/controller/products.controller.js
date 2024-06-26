import {UniqueError} from "../handle-errors/uniqueError.js"
import {productService} from "../repository/index.js";

// INSERTION
const insertProductsCtrl = async (req, res, next) => {
    try {
      let result = await productService.insertProducts();
      return res.json({
        status: "success",
        message: "all the products were inserted succesfully",
        products: result,
      });
    } catch (error) {
        next(error);
    }
};

// GET products
const getProductsCtrl = async (req, res, next) => {
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

        const result = await productService.getProducts(page, limit, queryObj, sort);

        return res.status(200).json({
            status: "success",
            ...result,
            prevLink: result.hasPrevPage ? `/api${result.prevLink}` : null,
            nextLink: result.hasNextPage ? `/api${result.nextLink}` : null
        })

    } catch (error) {
        next(error);
    }
};

// GET product by id
const getProductByIdCtrl = async (req, res, next) => {
    try {
        console.log(`Get product with id ${req.params.pid} `);

        const result = await productService.getProductById(req.params.pid);
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
};

// DELETE product by id
const deleteProductByIdCtrl = async (req, res, next) => {
    try {
        console.log(`Delete product with id ${req.params.pid} `);

        const result = await productService.deleteProduct(req.params.pid);
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
};

// POST product
const addProductCtrl = async (req, res, next) => {
    try {
        const product = req.body;

        const result = await productService.addProduct(product);
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
};

// PUT product by id
const updateProductByIdCtrl = async (req, res, next) => {
    try {
        console.log(`Edit product with id ${req.params.pid} `);

        const result = await productService.updateProduct(req.params.pid, req.body);
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
};


export {
    insertProductsCtrl, 
    getProductsCtrl,
    getProductByIdCtrl,
    deleteProductByIdCtrl,
    addProductCtrl,
    updateProductByIdCtrl
};