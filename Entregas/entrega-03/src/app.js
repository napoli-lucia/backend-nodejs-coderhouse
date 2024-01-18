const express = require("express");
const ProductManager = require("./productManager");

const path = require("path");
const pathBase = path.join(__dirname, "./db.json")
const manager = new ProductManager(pathBase);

console.log("SERVIDOR EXPRESS");

const PORT = 8080;

const app = express();


app.get("/", (req, res) => {
    res.send(`API LIVE ${PORT}!!!!`);
});

app.get("/products", async (req, res) => {
    const products = await manager.getProducts();
    
    if(req.query.limit){
        console.log(`Get ${req.query.limit} products`);
        const numLimit = Number(req.query.limit);
        res.send({products : Object.values(products)[0].slice(0,numLimit)});
        
    } else{
        console.log("Get all products");
        res.send(products);
    }
});

app.get("/products/:pid", async (req, res) => {
    console.log("Get param", req.params);
    const product = await manager.getProductById(Number(req.params.pid));
    res.send(product)

});


app.delete("/products/:pid", async (req, res) => {
    console.log("Get param", req.params);
    const product = await manager.deleteProduct(Number(req.params.pid));
    res.status(product.status).send(product.message);
});
    


app.listen(PORT, () => {
    console.log("SERVER UP AND RUNNING");
})