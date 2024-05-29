import passport from "passport";
import local from "passport-local";
import usersModel from "../models/users.model.js"
import { isValidPasswd } from "../../utils/encrypt.js"

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
          // Busco al user por el email
          let user = await usersModel.findOne({ email });
          console.log("🚀 ~ file: passport.config.js ~ user:", user);
          
          //Si el usuario existe (null: no hay error, false: no se genero un user nuevo)
          if (user) {
            return done(null, false);
          }

          // const pswHashed = await createHash(password);

          // const addUser = {
          //   first_name,
          //   last_name,
          //   email,
          //   age,
          //   password: pswHashed,
          // };

          // const newUser = await userModel.create(addUser); // promesa

          const newUser = await manager.addUser(first_name, last_name, email, age, password);


          if (!newUser) {
            return res
              .status(500)
              .json({ message: `we have some issues registering this user` });
          }

          return done(null, newUser);
          
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
          const user = userModel.findOne({ email: username });

          if (!user) {
            // TODO: User does not exist in DB
            return done(null, false);
          }
          if (!isValidPasswd(passport, user.password)) {
            // TODO: User password is not the same in DB
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