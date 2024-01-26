const fs = require("fs/promises");

class CartManager{
    constructor(path) {
		this.path = path;
	}

    async #getCarts(){
        try {
            const allCarts = await fs.readFile(this.path);
            return JSON.parse(allCarts);
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
           if(allCarts.carts.length === 0){
                cart.id = 1;
           } else{
                cart.id=allCarts.carts[allCarts.carts.length - 1].id + 1;
           }
            
            //Agrego el carrito
            allCarts.carts.push(cart);
            await fs.writeFile(this.path, JSON.stringify(allCarts));
            return {message: "Carrito agregado!"};
            
        } catch (error) {
            throw new Error(`No se puede agregar el carrito\n ${error.message}`);
        }
    }

    async getCartById(id){
        try {
            const allCarts = await this.#getCarts();

            const cartIndex = allCarts.carts.findIndex((cart) => cart.id === id);

            if(cartIndex === -1){
                return {error: "Not found"};
            } else{
                return allCarts.carts[cartIndex];
            }


        } catch (error) {
            throw new Error(`No se puede obtener el carrito con id ${id}\n ${error.message}`);
        }
    }


    async addProductToCart(cid,pid, quantity){
        try {
            const allCarts = await this.#getCarts();

            const cartIndex = allCarts.carts.findIndex((cart) => cart.id === cid);

            if(cartIndex === -1){
                return {error: "Cart not found"};
            } 
            
            const cart = allCarts.carts[cartIndex];
            const product = {
                "id": pid, 
                "quantity": quantity
            }
            cart.products.push(product);
            await fs.writeFile(this.path, JSON.stringify(allCarts));
            return {message: "Producto agregado al carrito!"};



        } catch (error) {
            throw new Error(`No se puede agregar el producto al carrito\n ${error.message}`);
        }
    }

}

module.exports = CartManager; 