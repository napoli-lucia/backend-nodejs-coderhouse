import productsModel from "../models/products.model.js";
import productsData from "../../data/products.init-data.js";

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
            //Chequeo que el codigo no se repita
            // TO DO
    
            //Chequeo que esten todos los campos obligatorios
            if(!this.#obligatoryProperties(Object.keys(product))){
                return {error: "Producto no agregado. Faltan datos!"};
            }

            //Chequeo que los datos sean de tipo correcto
            if(!this.#checkProductData(product)){
                return {error: "Producto no agregado. Datos erroneos"};
            }
            
            //Id autoincrementable
            const allProducts = await this.getProducts();
            product.id = allProducts.length === 0 ? 1 : allProducts.length + 1;
            
            //Agrego el producto
            await productsModel.create(product);
            return {message: "Producto agregado!"};
            
        } catch (error) {
            throw new Error(`No se puede agregar el producto\n ${error.message}`);
        }
    }


    async getProducts(limitNumber){
        try {
            const allProducts = await productsModel.find({}).limit(limitNumber);
            return allProducts;
        } catch (error) {
            throw new Error(`No se pueden obtener los productos\n ${error.message}`);
        }
    }


    async getProductById(id){
        try {
            const product = await productsModel.find({"id": id});

            return product.length === 0 ? {error: "Not found"} : product;


        } catch (error) {
            throw new Error(`No se puede obtener el producto con id ${id}\n ${error.message}`);
        }
    }


    async updateProduct(id, newData) {
        try {
            const allProducts = await this.getProducts();
            const productIndex = allProducts.products.findIndex((product) => product.id === id);
    
            if(productIndex === -1){
                return {error: `No se puede actualizar el producto con id ${id} porque no existe`};
            
            } else{
                const product = allProducts.products[productIndex];
                
                Object.keys(newData).forEach((element) => {
                    if(Object.keys(product).includes(element)){
                        product[element] = newData[element];
                    }
                });
                
                allProducts.products[productIndex] = product;
    
                //await fs.writeFile(this.path, JSON.stringify(allProducts));
                return {message: `Se actualizó el producto con id ${id}`};
            }	
            
        } catch (error) {
            throw new Error(`No se puede actualizar el producto con id ${id}\n ${error.message}`);
        }
	}

    
    async deleteProduct(id) {
        try {
            const allProducts = await this.getProducts(); 
            const productIndex = allProducts.products.findIndex((product) => product.id === id);
            
            if(productIndex === -1){
                return {error: "Not found"};
            } else{            
                allProducts.products.splice(productIndex,1);
                //await fs.writeFile(this.path, JSON.stringify(allProducts));
                return {message: `Se eliminó el producto con id ${id}`};   
            }
            
        } catch (error) {
            throw new Error(`No se puede eliminar el producto con id ${id}\n ${error.message}`);
        }
	}
}

export {ProductManager};