import { Router } from "express";
import passport from "passport";
import checkAuthJwt from "../middleware/auth-jwt.middleware.js";
import {
  logoutCtrl,
  loginCtrl,
  registerCtrl,
  changePswCtrl,
  githubCtrl,
  githubCallbackCtrl,
  currentCtrl,
  sendChangePswMailCtrl
} from "../controller/users.controller.js";

const router = Router();

// LOGOUT
router.get("/logout", logoutCtrl);

// LOGIN
router.post("/login", loginCtrl);

// REGISTER
router.post("/register", registerCtrl);

// CHANGE PASSWORD
router.post("/changePsw", changePswCtrl);

// SEND CHANGE PASSWORD MAIL
router.post("/changePswMail", sendChangePswMailCtrl);

// LOGIN GITHUB
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  githubCtrl
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  githubCallbackCtrl
);

// CURRENT
router.get("/current", checkAuthJwt("jwt"), currentCtrl);

export default router;