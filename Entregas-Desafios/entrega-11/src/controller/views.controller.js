import { productService } from "../repository/index.js";
import { cartService } from "../repository/index.js";
import { HttpResponse } from "../middleware/error-handle.js";

const httpResponse = new HttpResponse();

//** Vista de todos los productos **/
const viewHomeProductsCtrl = (req, res) => {
    productService.getAllProducts().then(result => {
        res.render("home", { products: result })
        //console.log("🚀 ~ productService.getAllProducts ~ result:", result)
    }).catch(err => {
        req.logger.error(`${err.message}`);
        httpResponse.BadRequest(res, err.message);
    })
};

//** Vista de todos los productos EN TIEMPO REAL**/
const viewRealTimeProductsCtrl = (req, res) => {
    productService.getAllProducts().then(result => {
        res.render("realTimeProducts", { products: result })
    }).catch(err => {
        req.logger.error(`${err.message}`);
        httpResponse.BadRequest(res, err.message);

    })
};

//** Vista del chat **/
const viewChatCtrl = (req, res) => {
    res.render("chat", {})
};

//** Vista de productos con paginacion y boton para agregar a carrito **/
const viewProductsCtrl = (req, res) => {
    const user = req.session.user;
    console.log("🚀 ~ router.get ~ user:", user);
    //console.log(req.query);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // const sort = req.query.sort === 'Ascendente' ? 1 
    // : req.query.sort === 'Descendente' ? -1 
    // : null;

    //console.log(req.query.sort);
    let sort;
    if (req.query.sort == 'Ascendente') sort = 1;
    if (req.query.sort == 'Descendente') sort = -1;
    if (req.query.sort != 'Ascendente' && req.query.sort != 'Descendente') sort = null;

    const query = req.query.query || null;
    //console.log("🚀 ~ router.get ~ query:", query)

    let queryObj = {}
    if (query != undefined && query != 'null') {
        queryObj.category = query;
    }

    productService.getProducts(page, limit, queryObj, sort).then(result => {
        //console.log("🚀 ~ productService.getProducts ~ result:", result)

        res.render("products", {
            products: result.payload,
            prevLink: result.prevLink,
            nextLink: result.nextLink,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            page: result.page,
            totalPages: result.totalPages,
            user: user,
            cart: user.cart
        })
    }).catch(err => {
        req.logger.error(`${err.message}`);
        httpResponse.BadRequest(res, err.message);

    })
};

//** Vista de un carrito **/
const viewCartByIdCtrl = (req, res) => {
    const cid = req.params.cid;
    const user = req.session.user;

    cartService.getCartById(cid).then(result => {
        res.render("cart", {
            products: result[0].products,
            user: user
        })
    }).catch(err => {
        req.logger.error(`${err.message}`);
        httpResponse.BadRequest(res, err.message);

    })
};

//** Vista perfil usuario **/
const viewProfileCtrl = async (req, res) => {
    const user = req.session.user;
    console.log("🚀 ~ router.get ~ user:", user)

    res.render("profile", {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role
    });
};

//** Vista recuperar contraseña **/
const viewRecoverPswCtrl = async (req, res) => {
    res.render("recover");
};

export {
    viewHomeProductsCtrl,
    viewRealTimeProductsCtrl,
    viewChatCtrl,
    viewProductsCtrl,
    viewCartByIdCtrl,
    viewProfileCtrl,
    viewRecoverPswCtrl
};