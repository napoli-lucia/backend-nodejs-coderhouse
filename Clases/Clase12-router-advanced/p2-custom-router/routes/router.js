const { Router } = require("express");
const jwt = require('jsonwebtoken');

class RouterClass {
    constructor(){
        this.router = Router();
    }

    getRouter = () => {
        return this.router
    }

    init(){}

    //Las callbacks pueden ser una o muchas (funcion de una ruta y middlewares)
    //son funciones pasadas como argumentos
    //Al poner ...params -> varios parametros estan en un array

    applyCallback(callbacks){
        return callbacks.map(callback => async(...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                console.log("🚀 ~ RouterClass ~ returncallbacks.map ~ error:", error);
                params[1].status(500);
                //0: req
                //1: res
                //2: next
            }
        })
    }

    generateCustomResponses = (req, res, next) => {
        res.sendSuccess = payload => res.send({status: 'success', payload});
        res.sendServerError = payload => res.send({status: 'error', error});
        res.sendUserError = payload => res.send({status: 'error', error});
    }

    //Hay dos maneras de recibir tokens
    //con cookies
    //con headers

    //asi puedo pasar varios roles
    handlePolicies = policies => (req, res, next) => {
        if(policies[0]==='PUBLIC') next();

        //Extraigo el token -> 'BEARER ashd./hsjakhdjhdjhddjdjkdah'
        const authHeaders = req.headers.authorization;
        const token = authHeaders.split(' ')[1];
        let user = jwt.verify(token, SECRET_JWT);

        if(!policies.includes(user.role.toUpperCase())){
            res.status(403).send({status: 'error', error: 'not permissions'});
        }
        req.user = user;
        next();
    }

    get(path, ...callbacks){
        this.router.get(path, this.handlePolicies, this.generateCustomResponses ,this.applyCallback(callbacks))
    }

    // post(){}

    // put(){}

    // delete(){}

}

module.exports = RouterClass;