const passport = require("passport");
const jwt = require("passport-jwt");
const ROLES = require("../constants/role")

const { SECRET_JWT } = require("../utils/jwt");

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieJWTExtractor = (req) => {
  //console.log("🚀 ~ cookieJWTExtractor ~ req:", req); 

  let token;
  if (req && req.cookies) {
    token = req.cookies["cookieToken"];
  }
  return token;
};

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieJWTExtractor]),
        //jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET_JWT,
      },
      async (jwtPayload, done) => {
        console.log("🚀 ~ jwtPayload:", jwtPayload)

        try {
          if(ROLES.includes(jwtPayload.role)){
            return done(null, jwtPayload);
          }
          return done(null, jwtPayload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

module.exports = initializePassport;