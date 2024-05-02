import productsModel from "../models/products.model.js";
import productsData from "../../data/products.init-data.js";
import {UniqueError} from "../../handle-errors/uniqueError.js"

class ProductManager{
    constructor(path) {
		this.path = path;
	}

    #obligatoryProperties(props){
        const obligatoryProps = [ 'title', 'description', 'price', 'code', 'stock', 'category' ];
        
        let result = true;
        obligatoryProps.forEach(prop => {
            if(!props.includes(prop)){
                console.log(`No incluye la propiedad ${prop}`);
                result = false;
            }
        });
        return result;
    }

    #checkProductData(product){
        const isNumber = x => typeof x === "number";
        const isString = x => typeof x === "string";
        const isBool = x => typeof x === "boolean";
        const isStringsArray = arr => arr.every(isString);

        if(product.status === null){
            product.status = true;
        }
        
        if(!product.thumbnails){
            product.thumbnails = ["sin imagen"];
        }

        let listString = [product.title, product.description, product.code, product.category];
        let listNumber = [product.price, product.stock];
        let listBool = [product.status];

        return listString.every(isString) && listNumber.every(isNumber) && listBool.every(isBool) && isStringsArray(product.thumbnails);
    }

    async insertProducts(){
        try {
            let result = await productsModel.insertMany(productsData);
            return result;
        } catch (error) {
            throw new Error(`No se pueden insertar los productos\n ${error.message}`);
        }
    }


    async addProduct(product){
        try {    
            //Chequeo que esten todos los campos obligatorios
            if(!this.#obligatoryProperties(Object.keys(product))){
                return {error: "Producto no agregado. Faltan datos!"};
            }

            //Chequeo que los datos sean de tipo correcto
            if(!this.#checkProductData(product)){
                return {error: "Producto no agregado. Datos erroneos"};
            }
            
            //Agrego el producto
            await productsModel.create(product);
            return {message: "Producto agregado!"};
            
        } catch (error) {
            //Chequeo si el error es por codigo repetido
            if (error.name === 'MongoServerError' && error.code === 11000) {
                throw new UniqueError('Producto invalido. El codigo ya existe')
              }
            throw new Error(`No se puede agregar el producto\n ${error.message}`);
        }
    }

    async getAllProducts(){
        try {
            return await productsModel.find({}).lean();
        } catch (error) {
            throw new Error(`No se pueden obtener los productos\n ${error.message}`);
        }
    }

    async getProducts(page, limit, query, sort){
        try {
            //return await productsModel.find({}).limit(limitNumber).lean();
            if(!sort){
                return await productsModel.paginate(query, { 
                    page: page, 
                    limit: limit
                })
            }
            return await productsModel.paginate(query, { 
                page: page, 
                limit: limit, 
                sort: {price: sort}
            })

        } catch (error) {
            throw new Error(`No se pueden obtener los productos\n ${error.message}`);
        }
    }


    async getProductById(pid){
        try {
            const product = await productsModel.find({"_id": pid});
            //console.log("🚀 ~ ProductManager ~ getProductById ~ product:", product)
            return product.length === 0 ? {error: "Not found"} : product;

        } catch (error) {
            throw new Error(`No se puede obtener el producto con id ${pid}\n ${error.message}`);
        }
    }


    async updateProduct(pid, newData) {
        try {
            const result = await productsModel.updateOne({"_id": pid}, {$set: newData});
            console.log("ProductManager ~ updateProduct ~ result:", result);

            return result.matchedCount === 0 
            ? {error: `No se puede actualizar el producto con id ${pid} porque no existe`}
            : {message: `Se actualizó el producto con id ${pid}`};
            
        } catch (error) {
            throw new Error(`No se puede actualizar el producto con id ${pid}\n ${error.message}`);
        }
	}

    
    async deleteProduct(pid) {
        try {
            const result = await productsModel.deleteOne({"_id": pid});
            console.log("ProductManager ~ deleteProduct ~ result:", result)

            return result.deletedCount === 0 ? {error: "Not found"} : {message: `Se eliminó el producto con id ${pid}`};
            
        } catch (error) {
            throw new Error(`No se puede eliminar el producto con id ${pid}\n ${error.message}`);
        }
	}
}

export {ProductManager};