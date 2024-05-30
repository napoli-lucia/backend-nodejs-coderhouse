import passport from "passport";
import local from "passport-local";
import usersModel from "../dao/models/users.model.js"
import { UserManager } from "../dao/db/users.manager.js";

const manager = new UserManager();

const localStrategy = local.Strategy;

const initializePassport = () => {

  //REGISTER
  passport.use(
    "register",
    new localStrategy(
      {
        passReqToCallback: true, //password requerido
        usernameField: "email", //quiero usar el email
      },
      async (req, username, password, done) => {
        console.log("🚀 ~ username:", username)

        const { first_name, last_name, email, age } = req.body;

        try {
          console.log("***REGISTER STRATEGY***");

          // Busco al user por el email
          let user = await usersModel.findOne({ email });
          console.log("🚀 ~ file: passport.config.js ~ user:", user);
          
          //Si el usuario existe (null: no hay error, false: no se genero un user nuevo)
          if (user) {
            return done(null, false);
          }

          const result = await manager.addUser(first_name, last_name, email, age, password);

          if (result.error) {
            return res.status(500).json({
                status: 500,
                message: result.error,
            });
          } 

          return done(null, result.user);
          
        } catch (error) {
          return done(`error getting user ${error}`);
        }
      }
    )
  );

  //LOGIN
  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          console.log("***LOGIN STRATEGY***");

          const user = await manager.getUser(username,password);

          // if (user.error) {
          //   return res.status(foundUser.code).json({
          //       status: foundUser.code,
          //       message: foundUser.error,
          //   });
          // };

          if (user.error) {
            return done(null, false);
          }

          //Se loguea correctamente
          return done(null, user);

        } catch (error) {
          console.log("🚀 ~ file: passport.config.js ~ error:", error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
    //null: que no hay error
    //pasamos el id del usuario que registramos
  });

  passport.deserializeUser(async (id, done) => {
    let user = await usersModel.findById({ _id: id });
    done(null, user);
  });
};

export default initializePassport;