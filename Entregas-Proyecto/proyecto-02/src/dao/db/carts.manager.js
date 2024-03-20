import cartsModel from "../models/carts.model.js";
//import productsData from "../../data/products.init-data.js";

class CartManager{
    constructor(path) {
		this.path = path;
	}

    async #getCarts(){
        try {
            return await cartsModel.find({});

        } catch (error) {
            throw new Error(`No se pueden obtener los carritos\n ${error.message}`);
        }
    }

    async addCart(){
        try {
            const allCarts = await this.#getCarts();

            //Nuevo carrito: id y products
            const cart = {
                "products": []
            }
            
           //Id autoincrementable
           cart.id = allCarts.length === 0 ? 1 : allCarts.length + 1;
        //    if(allCarts.carts.length === 0){
        //         cart.id = 1;
        //    } else{
        //         cart.id=allCarts.carts[allCarts.carts.length - 1].id + 1;
        //    }
            
            //Agrego el carrito
            await cartsModel.create(cart);
            return {message: "Carrito agregado!"};
            
        } catch (error) {
            throw new Error(`No se puede agregar el carrito\n ${error.message}`);
        }
    }

    async getCartById(id){
        try {          
            const cart = await cartsModel.find({"id": id});
            return cart.length === 0 ? {error: "Not found"} : cart;

        } catch (error) {
            throw new Error(`No se puede obtener el carrito con id ${id}\n ${error.message}`);
        }
    }


    async addProductToCart(cid,pid){
        try {
            const cart = await this.getCartById(cid);
            //console.log("🚀 ~ CartManager ~ addProductToCart ~ cart:", cart)
            
            if(cart.error){
                return {error: "Cart not found"};
            } 

            // const allCarts = await this.#getCarts();
            // const cartIndex = allCarts.carts.findIndex((cart) => cart.id === cid);
            // if(cartIndex === -1){
            //     return {error: "Cart not found"};
            // } 
            //const cart = allCarts.carts[cartIndex];
            const products = cart[0].products;

            const productIndex = products.findIndex((prod) => prod.id === pid);

            if(productIndex === -1){
                products.push({product: pid});
            } else{
                products[productIndex].quantity +=1;
            }
            
            //await fs.writeFile(this.path, JSON.stringify(allCarts));
            await cartsModel.updateOne({id: cid}, cart);
            return {message: "Producto agregado al carrito!"};

        } catch (error) {
            throw new Error(`No se puede agregar el producto al carrito\n ${error.message}`);
        }
    }
}

export {CartManager};