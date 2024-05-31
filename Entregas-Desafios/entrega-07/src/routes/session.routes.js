import  { Router } from "express";
import passport from "passport";
import { UserManager } from "../dao/db/users.manager.js";

const manager = new UserManager();

const router = Router();

// LOGOUT
router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.redirect("/login");
    return res.send({ message: `logout error`, body: err });
  });
});


// LOGIN
router.post("/login", async (req, res, next) => {
  try {
    console.log("BODY LOGIN: ", req.body);
    const { email, password } = req.body;
    const session = req.session;
    console.log("🚀 ~ router.post ~ session:", session)
    
    const foundUser = await manager.getUser(email, password);
    if (foundUser.error) {
      return res.status(foundUser.code).json({
          status: foundUser.code,
          message: foundUser.error,
      });
    };

    req.session.user = {
      first_name: foundUser.first_name,
      last_name: foundUser.last_name, 
      email: foundUser.email,
      age: foundUser.age,
      role: foundUser.role
    }
    //console.log("🚀 ~ router.post ~ req.session.user:", req.session.user)

    return res.redirect("/products");
  } catch (error) {
    next(error);
  }
});


// REGISTER
router.post("/register", async (req, res, next) => {
    try {
      console.log("BODY REGISTER: ", req.body);
      const { first_name, last_name, email, age, password } = req.body;
      
      const result = await manager.addUser(first_name, last_name, email, age, password);
      
      if (result.error) {
        return res.status(500).json({
            status: 500,
            message: result.error,
        });
      }  
      //console.log("🚀 ~ router.post ~ result:", result.message);

      // session del usuario
      // guardo info no sensible
      req.session.user = { first_name, last_name, email, age };
      //console.log("🚀 ~ router.post ~ req.session.user:", req.session.user)
      return res.redirect("/login");
  
    } catch (error) {
        next(error);
    }
});


// RECOVER PASSWORD
router.post("/recover-psw", async (req, res, next) => {
  try {
    console.log("BODY RECOVER: ", req.body);
    const { email, new_password } = req.body;
    const session = req.session;
    console.log("🚀 ~ router.post ~ session:", session)
    
    const foundUser = await manager.changePassword(email, new_password);
    if (foundUser.error) {
      return res.status(foundUser.code).json({
          status: foundUser.code,
          message: foundUser.error,
      });
    };

    return res.redirect("/login");

  } catch (error) {
    next(error);
  }
});

// LOGIN GITHUB
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      req.session.user = req.user;
      res.redirect("/products");
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
);

export default router;