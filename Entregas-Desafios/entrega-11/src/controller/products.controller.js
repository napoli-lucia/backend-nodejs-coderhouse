import { UniqueError } from "../handle-errors/uniqueError.js"
import { productService } from "../repository/index.js";
import { generateProduct } from "../utils/generate-products.js";
import { HttpResponse } from "../middleware/error-handle.js";
const httpResponse = new HttpResponse();

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
        req.logger.error(`${error.message}`);
        next(error);
    }
};

// MOCKING
const mockingProductsCtrl = async (req, res, next) => {
    try {
        let products = [];
        const MAX_products = 100;
        for (let i = 0; i < MAX_products; i++) {
            products.push(generateProduct());
        };
        req.logger.info(`Mocking Products: ${products}`);

        let result = await productService.insertMockingProducts(products);
        return res.json({
            status: "success",
            message: "all the mocking products were inserted succesfully",
            products: result,
        });
    } catch (error) {
        req.logger.error(`${error.message}`);
        next(error);
    }
};

// GET products
const getProductsCtrl = async (req, res, next) => {
    try {
        req.logger.info(`GET products - req.query: ${JSON.stringify(req.query)}`);

        if (req.query.limit && isNaN(req.query.limit) || Number(req.query.limit) < 0) {
            req.logger.error("GET: Limit error");
            return httpResponse.BadRequest(res, "this limit is not valid");
        }
        if (req.query.page && isNaN(req.query.page) || Number(req.query.page) < 0) {
            req.logger.error("GET: Page error");
            return httpResponse.BadRequest(res, "this page is not valid");
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const sort = req.query.sort === 'Ascendente' ? 1
            : req.query.sort === 'Descendente' ? -1
                : null;

        const query = req.query.query || null;

        let queryObj = {}
        if (query != undefined && query != 'null') {
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
        req.logger.error(`${error.message}`);
        next(error);
    }
};

// GET product by id
const getProductByIdCtrl = async (req, res, next) => {
    try {
        req.logger.info(`Get product with id ${req.params.pid}`);

        const result = await productService.getProductById(req.params.pid);
        if (result.error) return httpResponse.NotFound(res, result.error);
        return res.send(result);

    } catch (error) {
        req.logger.error(`${error.message}`);
        next(error);
    }
};

// DELETE product by id
const deleteProductByIdCtrl = async (req, res, next) => {
    try {
        req.logger.info(`Delete product with id ${req.params.pid}`);
        const result = await productService.deleteProduct(req.params.pid);

        if (result.error) return httpResponse.NotFound(res, result.error);

        return httpResponse.OK(res, result.message);

    } catch (error) {
        req.logger.error(`${error.message}`);
        next(error);
    }
};

// POST product
const addProductCtrl = async (req, res, next) => {
    try {
        const result = await productService.addProduct(req.body);
        if (result.error) return httpResponse.BadRequest(res, result.error);

        return httpResponse.OK(res, result.message);

    } catch (error) {
        req.logger.error(`${error.message}`);
        if (error instanceof UniqueError) {
            return httpResponse.BadRequest(res, error.message);
        }
        next(error);
    }
};

// PUT product by id
const updateProductByIdCtrl = async (req, res, next) => {
    try {
        req.logger.info(`Edit product with id ${req.params.pid}`);

        const result = await productService.updateProduct(req.params.pid, req.body);
        if (result.error) return httpResponse.NotFound(res, result.error);

        return httpResponse.OK(res, result.message);

    } catch (error) {
        req.logger.error(`${error.message}`);
        next(error);
    }
};


export {
    insertProductsCtrl,
    getProductsCtrl,
    getProductByIdCtrl,
    deleteProductByIdCtrl,
    addProductCtrl,
    updateProductByIdCtrl,
    mockingProductsCtrl
};