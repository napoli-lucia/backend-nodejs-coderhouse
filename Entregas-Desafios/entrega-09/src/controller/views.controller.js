import {ProductManager} from "../dao/db/products.manager.js";
const productManager = new ProductManager();
import {CartManager} from "../dao/db/carts.manager.js";
const cartManager = new CartManager();

//** Vista de todos los productos **/
const viewHomeProductsCtrl = (req, res) => {
    productManager.getAllProducts().then( result => {
        res.render("home", {products: result})
        //console.log("🚀 ~ productManager.getAllProducts ~ result:", result)
    }).catch( err => {
        console.log("productManager.getProducts ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    })
};

//** Vista de todos los productos EN TIEMPO REAL**/
const viewRealTimeProductsCtrl = (req, res) => {
    productManager.getAllProducts().then( result => {
        res.render("realTimeProducts", {products: result})
    }).catch( err => {
        console.log("productManager.getProducts ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
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
    if(req.query.sort == 'Ascendente') sort=1;
    if(req.query.sort == 'Descendente') sort=-1;
    if(req.query.sort != 'Ascendente' && req.query.sort != 'Descendente') sort=null;

    const query = req.query.query || null;
    //console.log("🚀 ~ router.get ~ query:", query)

    let queryObj = {}
    if(query != undefined && query != 'null' ){
        queryObj.category = query;
    }

    productManager.getProducts(page, limit, queryObj, sort).then( result => {
        //console.log("🚀 ~ productManager.getProducts ~ result:", result)
        
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
    }).catch( err => {
        console.log("productManager.getProducts ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    })
};

//** Vista de un carrito **/
const viewCartByIdCtrl = (req, res) => {
    const cid = req.params.cid;
    console.log("🚀 ~ router.get ~ cid:", cid);

    cartManager.getCartById(cid).then( result => {
        res.render("cart", {
            products: result[0].products
        })
    }).catch( err => {
        console.log("🚀 ~ cartManager.getCartById ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
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