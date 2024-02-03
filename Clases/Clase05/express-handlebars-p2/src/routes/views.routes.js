const { Router } = require("express");

const router = Router();

//renderizar la lista de registro
/*
router.get("/", (req, res) => {
    res.render("register", {});
});*/

router.get("/", (req, res) => {
  res.render("register", {
    style: "index.css",
    name: 'test'
  });
});

module.exports = router;