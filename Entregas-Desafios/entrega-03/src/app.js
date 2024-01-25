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

app.get("/products", async (req, res, next) => {
    try {
        const products = await manager.getProducts();

        if (req.query.limit) {
            console.log(`Get ${req.query.limit} products`);
            if (isNaN(req.query.limit) || Number(req.query.limit) < 0) {
                console.log("GET: Limit error");
                return res.status(400).json({
                    status: 400,
                    message: `this limit is not valid`,
                });
            }

            return res.send({ products: Object.values(products)[0].slice(0, Number(req.query.limit)) });
        };

        console.log("Get all products");
        return res.send(products);

    } catch (error) {
        next(error);
    }
});

app.get("/products/:pid", idErrors, async (req, res, next) => {
    try {
        console.log(`Get product with id ${req.params.pid} `);

        const result = await manager.getProductById(Number(req.params.pid));
        if (result.error) {
            return res.status(404).json({
                status: 404,
                message: result.error,
            });
        }
        return res.send(result);

    } catch (error) {
        next(error);
    }
});


//**Extra al desafio**//

app.delete("/products/:pid", idErrors, async (req, res, next) => {
    try {
        console.log("Get param", req.params);

        const result = await manager.deleteProduct(Number(req.params.pid));
        if (result.error) {
            return res.status(404).json({
                status: 404,
                message: result.error,
            });
        }
        return res.status(200).json({
            status: 200,
            message: result.message,
        });

    } catch (error) {
        next(error);
    }
});


app.post("/products", async (req, res, next) => {
    try {
        const product = req.body;

        const result = await manager.addProduct(product);
        if (result.error) {
            return res.status(400).json({
                status: 400,
                message: result.error,
            });
        };
        return res.status(200).json({
            status: 200,
            message: result.message,
        });

    } catch (error) {
        next(error);
    }
});


app.put("/products/:pid", idErrors, async (req, res, next) => {
    try {
        const result = await manager.updateProduct(Number(req.params.pid), req.body);
        if (result.error) {
            return res.status(404).json({
                status: 404,
                message: result.error,
            });
        };
        return res.status(200).json({
            status: 200,
            message: result.message,
        });

    } catch (error) {
        next(error);
    }
});

function idErrors(req, res, next) {
    if (isNaN(req.params.pid) || Number(req.params.pid) < 0) {
        console.log("Id error");
        return res.status(400).json({
            status: 400,
            message: `this id is not valid`,
        });
    }
    next();
};

function serverErrors(error, req, res, next) {
    console.log(error);
    res.status(500).send('An internal server error occurred');
};

app.use(serverErrors);


app.listen(PORT, () => {
    console.log("SERVER UP AND RUNNING");
})