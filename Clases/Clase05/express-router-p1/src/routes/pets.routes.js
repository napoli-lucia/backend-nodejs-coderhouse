const {Router} = require("express")

const router = Router();

const petsList = [
    {
        id: 1,
        name: "perro"
    },
    {
        id: 2,
        name: "gato"
    }
]

router.get(`/`, (req,res) => {
    return res.json({
        ok: true,
        users: petsList
    })
})

module.exports = router;