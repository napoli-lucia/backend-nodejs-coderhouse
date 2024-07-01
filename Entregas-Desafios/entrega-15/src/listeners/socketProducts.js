//import {ProductManager} from "../dao/filesystem/productManager.js";
//const manager = new ProductManager("./src/data/productos.json");
import ProductServiceDao from "../dao/mongodb/products.service.js";
const productService = new ProductServiceDao();


const socketProducts = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log("Cliente conectado: ", socket.id);

        //Ver lista productos
        const listadeproductos = await productService.getProducts();
        socket.emit("real-products",listadeproductos);

        //Ingresar nuevo producto
        socket.on("create-prod", async (data) => {
            console.log("Data ingresada:", data)
            const res = await productService.addProduct(data);
            console.log("Respuesta:", res);
            
            const listadeproductos = await productService.getProducts();
            socket.emit("real-products",listadeproductos);
        })

        //Eliminar producto
        socket.on("delete-prod", async (pid) => {
            console.log("Id ingresado:", pid);
            
            const res = await productService.deleteProduct(pid);
            console.log("Respuesta:", res);
            
            const listadeproductos = await productService.getProducts();
            socket.emit("real-products",listadeproductos)
        })

    });
};

export default socketProducts;