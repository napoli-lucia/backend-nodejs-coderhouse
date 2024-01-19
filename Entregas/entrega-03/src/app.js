const express = require("express");
const ProductManager = require("./productManager");
const manager = new ProductManager("./src/db.json");

console.log("SERVIDOR EXPRESS");

const PORT = 8080;

const app = express();

app.use(express.urlencoded({ extends: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`Bienvenido al manager de productos en el puerto ${PORT}!!!!`);
});

app.get("/products", async (req, res) => {
    const products = await manager.getProducts();
    
    if(req.query.limit){
        const limit = req.query.limit;
        console.log(`Get ${limit} products`);
        
        if (isNaN(limit)) {
            return res.status(400).json({
              status: 400,
              message: `client side error`,
            });
        }

        const numLimit = Number(limit);
        if (numLimit < 0) {
            return res.status(400).json({
                status: 400,
                message: `this limit is not valid`,
            });
        }

        res.send({products : Object.values(products)[0].slice(0,numLimit)});
        
    } else{
        console.log("Get all products");
        res.send(products);
    }
});

app.get("/products/:pid", async (req, res) => {
    console.log(`Get product with id ${req.params.pid} `);

    if (isNaN(req.params.pid)) {
        return res.status(400).json({
          status: 400,
          message: `client side error`,
        });
    }

    const numId = Number(req.params.pid);
    if (numId < 0) {
        return res.status(400).json({
            status: 400,
            message: `this id is not valid`,
        });
    }

    const result = await manager.getProductById(numId);
    if(result.error){
        return res.status(404).json({
            status: 404,
            message: result.error,
        });
    }
    res.send(result);
});


//**Extra al desafio**//

app.delete("/products/:pid", async (req, res) => {
    console.log("Get param", req.params);

    if (isNaN(req.params.pid)) {
        return res.status(400).json({
          status: 400,
          message: `client side error`,
        });
    }

    const numId = Number(req.params.pid);
    if (numId < 0) {
        return res.status(400).json({
            status: 400,
            message: `this id is not valid`,
        });
    }

    const result = await manager.deleteProduct(numId);
    if(result.error){
        return res.status(404).json({
            status: 404,
            message: result.error,
        });
    }
    return res.status(200).json({
        status: 200,
        message: result.message,
    });
});


app.post("/product", async (req, res) => {
    const product = req.body;

    const result = await manager.addProduct(product);
    if(result.error){
        return res.status(400).json({
            status: 400,
            message: result.error,
        });
    };
    return res.status(200).json({
        status: 200,
        message: result.message,
    });
});


app.put("/products/:pid", async (req, res) => {
    if (isNaN(req.params.pid)) {
        return res.status(400).json({
          status: 400,
          message: `client side error`,
        });
    }

    const numId = Number(req.params.pid);
    if (numId < 0) {
        return res.status(400).json({
            status: 400,
            message: `this id is not valid`,
        });
    }

    const product = req.body;

    const result = await manager.updateProduct(numId, product);
    if(result.error){
        return res.status(404).json({
            status: 404,
            message: result.error,
        });
    };
    return res.status(200).json({
        status: 200,
        message: result.message,
    });
});
    

app.listen(PORT, () => {
    console.log("SERVER UP AND RUNNING");
})