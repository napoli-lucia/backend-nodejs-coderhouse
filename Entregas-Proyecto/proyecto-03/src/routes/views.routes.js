import  { Router } from "express";
import passport from "passport";
import {
    viewHomeProductsCtrl,
    viewRealTimeProductsCtrl,
    viewChatCtrl,
    viewProductsCtrl,
    viewCartByIdCtrl,
    viewProfileCtrl,
    viewRecoverPswCtrl
} from "../controller/views.controller.js"

const router = Router();

//** Vista de todos los productos **/
router.get("/", viewHomeProductsCtrl);

//** Vista de todos los productos EN TIEMPO REAL**/
router.get("/realTimeProducts", viewRealTimeProductsCtrl);

//** Vista del chat **/
router.get("/chat", viewChatCtrl);

//** Vista de productos con paginacion y boton para agregar a carrito **/
router.get("/products", viewProductsCtrl);

//** Vista de un carrito **/
router.get("/carts/:cid", viewCartByIdCtrl);

//********************************************************************//

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

//********************************************************************//

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

//********************************************************************//

//** Vista perfil usuario **/
router.get(`/profile`, viewProfileCtrl);

//** Vista recuperar contraseña **/
router.get("/recover", viewRecoverPswCtrl);

export default router;