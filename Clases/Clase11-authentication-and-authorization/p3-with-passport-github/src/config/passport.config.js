const passport = require("passport");
const GithubStrategy = require("passport-github2");
const userModel = require("../model/user.model");
const dotenv = require("dotenv");
dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID; 
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const initializePassport = () => {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/session/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("🚀 ~ profile:", profile);
        try {
          let user = await userModel.findOne({ email: profile._json?.email });
          if (!user) {
            //si no existe el usuario
            let addNewUser = {
              first_name: profile._json.name,
              last_name: "",
              email: profile._json?.email,
              age: 0,
              password: "",
            };
            let newUser = await userModel.create(addNewUser);
            done(null, newUser);
          } else {
            // ya existia el usuario
            done(null, user);
          }
        } catch (error) {
          console.log("🚀 ~ file: passport.config.js:41 ~ error:", error);

          done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById({ _id: id });
    done(null, user);
  });
};

module.exports = initializePassport;