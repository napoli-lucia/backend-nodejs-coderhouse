const { Router } = require("express");

const router = Router();

// setCookie
router.post(`/setCookie`, (req, res) => {
  const body = req.body;
  console.log("🚀 ~ file: cookies.routes.js:8 ~ router.post ~ body:", body);

  return res
    .cookie(
      "cookieUser", //nombre o identificador de la cookie
      { user: `${body.email}` }, //info del usuario que quiero almacenar
      //{ maxAge: 20000 } //definir opciones de la cookie, aca es cuanto tiempo vive la cookie
      { maxAge: 20000, signed: true }
    )
    .send();
});

// getCookie
router.get(`/getCookie`, (req, res) => {
  console.log("INFO DE LAS COOKIES", req.cookies, req.signedCookies);
  return res.json({ cookie: req.cookies, signedCookies: req.signedCookies });
  // req.cookies cookies sin firma
  // req.signedCookies cookies con firma
});

// deleteCookie
// es un metodo get
router.get(`/deleteCookie`, (req, res) => {
    //return res.clearCookie("cookieUser").end();
    return res.clearCookie("cookieUser").send("Cookie removed");
});

module.exports = router;