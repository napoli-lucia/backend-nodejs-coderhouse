const { Router } = require("express");

const router = Router();

const pets = [];

//Expresiones regulares
const regExpPetName = "[a-zA-Z]+";

// GET petName
router.get(`/:petName(${regExpPetName})`, (req, res) => {
    const { petName } = req;
    console.log("🚀 ~ file: pets.routes.js:11 ~ router.get ~ petName:", petName);
    console.log(
        "🚀 ~ file: pets.routes.js:11 ~ router.get ~ PETNAME DESDE REQ:",
        req.petName
    );

    const findPet = pets.find(
        (pet) => pet.name.toLocaleLowerCase() === petName.toLocaleLowerCase()
    );
    if (!findPet) {
        res.json({
            ok: true,
            message: `this pet ${req.petName} does not exist`,
        });
    }

    return res.json({ ok: true, pet: findPet, message: "search pets by name" });
});

// GET all
router.get(`/`, (req, res) => {
    return res.json({ ok: true, pets, message: "get all pets" });
});

// POST
// CONSTRUIR UN MDW para validar el nombre de la mascota, y apoyense de la expresion
router.post(`/`, (req, res) => {
    const { name, specie } = req.body;
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

// PUT
router.put(`/:petName(${regExpPetName})`, (req, res) => {
    const { petName } = req || req.params; // req.petName
    const pet = pets.find((p) => {
        return p.name === petName.toLocaleLowerCase(); // Perro !== perro
    });

    // Si la mascota no existe mandar un error con codigo de estado http correcto

    const petIndex = pets.findIndex((p) => {
        return p.name === petName.toLocaleLowerCase();
    });

    const updatedPet = { ...pet, adopted: true };
    pets[petIndex] = { ...updatedPet };
    return res.json({ ok: true, pet: updatedPet, message: "pet updated" });
});

// router.param
// middleware para el parametro
router.param("petName", async (req, res, next, petName) => {
    console.log("🚀 ~ router.param ~ petName:", petName)

    if (!petName) {
        req.petName = null;
    } else {
        req.petName = petName;
    }

    next();
});

module.exports = router;