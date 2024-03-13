function authMdw(req, res, next) {
    console.log("****AUTH MDW*********");

    //Si esta logueado muestra el perfil
    if (req.session?.user) {
      return next();
    }
    //Sino redirige a login
    return res.redirect("/login");
  }
  
module.exports = authMdw;