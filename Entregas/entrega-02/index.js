const path = require("path");
const ProductManager = require("./productManager");

const projectProducts = async () => {
    console.log('INICIANDO EL PROYECTO MANEJADOR DE PRODUCTOS');
    try {
        const pathBase = path.join(__dirname, "db.json")
        const manager = new ProductManager(pathBase);

        console.log("Sin productos:");
        let products = await manager.getProducts();
        console.log(products);
        console.log("-----------------------------------------------");

        //Agrego producto
        console.log("Añado los productos:");
        await manager.addProduct(product1); //valido
        await manager.addProduct(product2); //NO valido -> le falta stock
        await manager.addProduct(product3); //NO valido -> le falta descripcion
        await manager.addProduct(product4); //valido
        console.log("-----------------------------------------------");

        console.log("Todos los productos:");
        products = await manager.getProducts();
        console.log(products);
        console.log("-----------------------------------------------");

        console.log("Intento agregar producto con codigo ya existente");
        await manager.addProduct(product5);
        console.log("-----------------------------------------------");

        console.log("Busco producto con id 2");
        await manager.getProductById(2);
        console.log("-----------------------------------------------");

        console.log("Busco producto con id 7, que no existe");
        await manager.getProductById(7);
        console.log("-----------------------------------------------");

        console.log("Actualizo producto con algunos datos");
        await manager.updateProduct(1,{
            description: "Harina Leudante",
            price: 35});
        console.log("-----------------------------------------------");

        console.log("Actualizo producto con todos los datos, pero solo con dos modificaciones");
        await manager.updateProduct(2,{
            title: "Queso",
            description: "Queso roquefort",
            price: 45,
            thumbnail: "sin imagen",
            code: "ABC004",
            stock: 32
        });
        console.log("-----------------------------------------------");

        console.log("Actualizo producto que no existe");
        await manager.updateProduct(9,{
            description: "Harina Leudante",
            price: 35});
        console.log("-----------------------------------------------");

        products = await manager.getProducts();
        console.log(products);
        console.log("-----------------------------------------------");

        console.log("Elimino producto con id 2");
        await manager.deleteProduct(2);
        console.log("-----------------------------------------------");

        console.log("Elimino producto con id 7 que no existe");
        await manager.deleteProduct(7);
        console.log("-----------------------------------------------");

        products = await manager.getProducts();
        console.log(products);
        
    } catch (error) {
        console.log("projectUsers ~ error:", error);
    }
    
    console.log('FIN');
}

projectProducts();


/*Productos*/
let product1 = {
    title: "Harina",
    description: "Harina 000",
    price: 25,
    thumbnail: "sin imagen",
    code: "ABC001",
    stock: 15
}

let product2 = {
    title: "Leche",
    description: "Leche deslactosada",
    price: 30,
    thumbnail: "sin imagen",
    code: "ABC002"
}

let product3 = {
    title: "Gaseosa",
    price: 15,
    thumbnail: "sin imagen",
    code: "ABC003",
    stock: 10
}

let product4 = {
    title: "Queso",
    description: "Queso provolone",
    price: 45,
    thumbnail: "sin imagen",
    code: "ABC004",
    stock: 12
}

let product5 = {
    title: "Agua",
    description: "Agua sin gas",
    price: 14,
    thumbnail: "sin imagen",
    code: "ABC004",
    stock: 11
}