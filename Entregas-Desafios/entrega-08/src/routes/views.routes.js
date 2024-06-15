import  { Router } from "express";
import passport from "passport";

import {ProductManager} from "../dao/db/products.manager.js";
const productManager = new ProductManager();
import {CartManager} from "../dao/db/carts.manager.js";
const cartManager = new CartManager();

const router = Router();

//** Vista de todos los productos **/
router.get("/", (req, res) => {
    productManager.getAllProducts().then( result => {
        res.render("home", {products: result})
        //console.log("🚀 ~ productManager.getAllProducts ~ result:", result)
        //console.log("🚀 ~ productManager.getProducts ~ result:", typeof(result))
    }).catch( err => {
        console.log("productManager.getProducts ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    })
})

//** Vista de todos los productos EN TIEMPO REAL**/
router.get("/realTimeProducts", (req, res) => {
    productManager.getAllProducts().then( result => {
        res.render("realTimeProducts", {products: result})
    }).catch( err => {
        console.log("productManager.getProducts ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    })
})

//** Vista del chat **/
router.get("/chat", (req, res) => {
    res.render("chat", {})
})

//** Vista de productos con paginacion y boton para agregar a carrito **/
router.get("/products", (req, res) => {
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
})

//** Vista de un carrito **/
router.get("/carts/:cid", (req, res) => {
    const cid = req.params.cid;
    console.log("🚀 ~ router.get ~ cid:", cid);

    cartManager.getCartById(cid).then( result => {
        // console.log("🚀 ~ cartManager.getCartById ~ result:", result[0].products);
        res.render("cart", {
            products: result[0].products
        })
        //console.log("🚀 ~ cartManager.getCartById ~ result.products:", result[0].products)
        //console.log("🚀 ~ cartManager.getCartById ~ result.products:", result[0].products[0].product.thumbnails)
    }).catch( err => {
        console.log("🚀 ~ cartManager.getCartById ~ err:", err);
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    })
})

//********************/

//** Vista registro usuario **/

// Register - GET
router.get("/register", async (req, res) => {
  res.render("register");
});

// Register - POST
router.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/",
    failureRedirect: "/failregister",
    failureFlash: true,
  })
);

// Register - fail
router.get("/failregister", async (req, res) => {
  res.send({ error: "register strategy failed" });
});

//********************/

//** Vista login usuario **/

// Login - GET
router.get("/login", async (req, res) => {
  res.render("login");
});

// Login - POST
router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/faillogin",
    failureFlash: true,
  })
);

// Login - fail
router.get("/faillogin", async (req, res) => {
  res.send({ error: "login strategy failed" });
});

//********************/

//** Vista perfil usuario **/
router.get(`/profile`, async (req, res) => {
    const user = req.session.user;
    console.log("🚀 ~ router.get ~ user:", user)

    res.render("profile", {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role
    });
});

//** Vista recuperar contraseña **/
router.get("/recover", async (req, res) => {
    res.render("recover");
});

export default router;