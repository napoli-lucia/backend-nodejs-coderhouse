function AuhMdw(req, res, next) {
    console.log("INFO SESSION", req.session);
    console.log("🚀 ~ AuhMdw ~ req.session.admin:", req.session.admin)
    console.log("🚀 ~ AuhMdw ~ req.session?.user:", req.session?.user)
    if (req.session?.user === "rabin" || req.session.admin) {
      return next();
    }
  
    return res
      .status(401)
      .send(`error en la autorizacion, no tiene suficientes privilegios`);
  }
  
module.exports = AuhMdw;