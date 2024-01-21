const {Router} = require("express")

const router = Router();

const userList = []
/*
const userList = [
    {
        id: 1,
        name: "rabin"
    },
    {
        id: 2,
        name: "dario"
    }
]*/

router.get(`/`, (req,res) => {
    return res.json({
        ok: true,
        users: userList
    })
})

// POST /api/users/
router.post(`/`,(req,res) => {
    
})

module.exports = router;