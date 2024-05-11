import cartsModel from "../models/carts.model.js";
import { ProductManager } from "../db/products.manager.js";
const productManager = new ProductManager();

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

    async #checkCartAndProduct(cid,pid){
        //Chequeo si el carrito existe
        const cart = await this.getCartById(cid);
        //console.log("Cart:", cart);
        if(cart.error){
            return {error: "Cart not found"};
        }

        //Chequeo si el producto existe en el ecommerce
        const productAvailable = await productManager.getProductById(pid);
        //console.log("Product:", productAvailable);
        if(productAvailable.error){
            return {error: "Product not available"};
        }
    }

    async addCart(){
        try {            
            //Creo el carrito
            const cart = await cartsModel.create({products: []});
            //console.log("🚀 ~ CartManager ~ addCart ~ cart:", cart)
            return {message: "Carrito agregado!"};
            
        } catch (error) {
            throw new Error(`No se puede agregar el carrito\n ${error.message}`);
        }
    }

    async getCartById(cid){
        try {          
            const cart = await cartsModel.find({"_id": cid})
            return cart.length === 0 ? {error: "Not found"} : cart;

        } catch (error) {
            throw new Error(`No se puede obtener el carrito con id ${cid}\n ${error.message}`);
        }
    }


    async addProductToCart(cid,pid){
        try {
            const checkResult = await this.#checkCartAndProduct(cid,pid);
            if(checkResult) return checkResult;
            
            //Chequeo si el producto ya esta o no en el carrito
            const productExist = await cartsModel.find({
                "_id": cid,"products":{$elemMatch:{"product": pid}}})
            //console.log("🚀 ~ CartManager ~ addProductToCart ~ productExist:", productExist)

            //Agrego cambios en el carrito
            let result;
            if(productExist.length === 0){
                result = await cartsModel.findOneAndUpdate({"_id": cid}, 
                    {$push: {products: {product: pid, quantity: 1}}});
                //console.log("🚀 ~ CartManager ~ addProductToCart ~ result:", result)
            } else{
                result = await cartsModel.updateOne({"_id": cid, "products.product": pid}, 
                    {$inc: {"products.$.quantity":1}});
            }

            //console.log("Result:", result)

            return result.acknowledged === false || result.modifiedCount === 0
            ? {error: `No se puede agregar el producto ${pid} al carrito ${cid}`}
            : {message: `Producto ${pid} agregado al carrito ${cid}`};


        } catch (error) {
            throw new Error(`No se puede agregar el producto al carrito\n ${error.message}`);
        }
    }

    async deleteProductInCart(cid, pid) {
        try {
            const result = await cartsModel.updateOne(
                {"_id": cid},
                {$pull: {products: {product: pid}}},
            )
            //console.log("ProductManager ~ deleteProduct ~ result:", result);

            return result.modifiedCount === 0 ? {error: "Not found"} : {message: `Se eliminó el producto con id ${pid}`};
            
        } catch (error) {
            throw new Error(`No se puede eliminar el producto con id ${id}\n ${error.message}`);
        }
	}

    async deleteAllInCart(cid){
        try {          
            const result = await cartsModel.updateOne(
                {"_id": cid},
                {$set: {products: []}},
            )
            //console.log("🚀 ~ CartManager ~ deleteAllInCart ~ result:", result)

            return result.matchedCount === 0 ? {error: "Not found"} : {message: `Se eliminaron todos los productos del carrito ${cid}`};

        } catch (error) {
            throw new Error(`No se puede obtener el carrito con id ${id}\n ${error.message}`);
        }
    }

    async updateProductQuantityInCart(cid, pid, newQuantity){
        try {
            const checkResult = await this.#checkCartAndProduct(cid,pid);
            if(checkResult) return checkResult;
            
            //Chequeo si el producto ya esta o no en el carrito
            const productExist = await cartsModel.find({
                "_id": cid,"products":{$elemMatch:{"product": pid}}})
            
            //Agrego cambios en el carrito
            let result;
            if(productExist.length === 0){
                result = await cartsModel.findOneAndUpdate({"_id": cid}, 
                    {$push: {products: {product: pid, quantity: newQuantity}}});
            } else{
                result = await cartsModel.updateOne({"_id": cid, "products.product": pid}, 
                    {$set: {"products.$.quantity":newQuantity}});
            }

            return result.matchedCount === 0 ? {error: "Not found"} : {message: `Se actualizo la cantidad del producto ${pid}`};

        } catch (error) {
            throw new Error(`No se puede obtener el carrito con id ${cid}\n ${error.message}`);
        }
    }

    async updateCart(cid, newData) {
        try {
            const result = await cartsModel.updateOne(
                {"_id": cid}, 
                {$set: {products: newData}});
            //console.log("ProductManager ~ updateProduct ~ result:", result);

            return result.matchedCount === 0 
            ? {error: "Not found"}
            : {message: `Se actualizó el carrito con id ${cid}`};
            
        } catch (error) {
            throw new Error(`No se puede actualizar el producto con id ${id}\n ${error.message}`);
        }
	}
}

export {CartManager};