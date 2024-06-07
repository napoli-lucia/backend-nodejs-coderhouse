const RouterClass = require("./router");

class UserRouter extends RouterClass {
    init(){
        this.get('/', ['ADMIN'], async (req,res) => {
            try {
                res.sendSuccess('get users')
            } catch (error) {
                res.sendServerError('error de server')
            }
        })
    }
}


module.exports = UserRouter;