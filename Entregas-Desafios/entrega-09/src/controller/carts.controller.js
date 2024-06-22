// import {CartManager} from "../dao/filesystem/cartManager.js";
// const manager = new CartManager("./src/data/carrito.json");
import {CartManager} from "../dao/db/carts.manager.js";
const cartManager = new CartManager();

// Crea un nuevo carrito
const addCartCtrl = async (req, res, next) => {
    try {
        const result = await cartManager.addCart();
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
};

// Listar los productos que pertenezcan al carrito con el parámetro cid
const getCartByIdCtrl = async (req, res, next) => {
    try {
        console.log(`Get cart with id ${req.params.cid}`);
        const result = await cartManager.getCartById(req.params.cid);
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

// Agregar el producto al carrito seleccionado
const addProductToCartCtrl = async (req, res, next) => {
    try {
        const result = await cartManager.addProductToCart(req.params.cid, req.params.pid);
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

// Eliminar el producto seleccionado de un carrito determinado
const deleteProductInCartCtrl = async (req, res, next) => {
    try {
        const result = await cartManager.deleteProductInCart(req.params.cid, req.params.pid);
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

// Eliminar todos los productos del carrito seleccionado
const deleteAllInCartCtrl = async (req, res, next) => {
    try {
        const result = await cartManager.deleteAllInCart(req.params.cid);
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

// Actualizar solo la cantidad dada de ejemplares del producto
const updateProductQuantityInCartCtrl = async (req, res, next) => {
    try {
        const result = await cartManager.updateProductQuantityInCart(req.params.cid, req.params.pid, req.body.quantity);
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


// Actualizar carrito con arreglo de productos
const updateCartCtrl = async (req, res, next) => {
    try {
        console.log("🚀 ~ router.put ~ req.body:", req.body)
        const result = await cartManager.updateCart(req.params.cid, req.body);
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


export {
    addCartCtrl,
    getCartByIdCtrl,
    addProductToCartCtrl,
    deleteProductInCartCtrl,
    deleteAllInCartCtrl,
    updateProductQuantityInCartCtrl,
    updateCartCtrl
};