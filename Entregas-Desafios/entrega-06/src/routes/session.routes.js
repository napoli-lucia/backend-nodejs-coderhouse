import  { Router } from "express";
import { UserManager } from "../dao/db/users.manager.js";

const manager = new UserManager();

const router = Router();

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
  
      console.log("🚀 ~ router.post ~ result:", result.message);
      // session del usuario
      // guardo info no sensible
      req.session.user = { first_name, last_name, email };
      return res.redirect("/login");
  
    } catch (error) {
        next(error);
    }
  });

export default router;