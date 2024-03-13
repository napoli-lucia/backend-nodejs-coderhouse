function AuhMdw(req, res, next) {
    console.log("INFO SESSION", req.session);
    console.log("🚀 ~ AuhMdw ~ req.session.admin:", req.session.admin)
    console.log("🚀 ~ AuhMdw ~ req.session?.user:", req.session?.user)
    //que el usuario este definido o es admin
    if (req.session?.user || req.session?.admin) {
      return next();
    }
  
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }
  
module.exports = AuhMdw;