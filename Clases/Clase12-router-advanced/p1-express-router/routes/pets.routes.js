const {Router} = require("express");

const router = Router();

const pets = [];

router.get(`/petName`, (req,res) => {

})

router.get(`/`, (req,res) => {

})

router.post(`/`, (req,res) => {
    const {name, specie} = req.body;
    const newPet = {
        name: name.toLocaleLowerCase(),
        specie: specie.toLocaleLowerCase()
    };
    pets.push(newPet);

    return res.json({
        ok: true,
        message: "pet created",
        pet: newPet
    })

})

router.put(`/petName`, (req,res) => {

})

module.exports = router;