const fs = require("fs/promises");

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

    async addProduct(product){
        try {
            const allProducts = await this.getProducts();
    
            //Chequeo que el codigo no se repita
            const codigos = allProducts.products.map((product) => product.code);
            if(codigos.includes(product.code)){
                return {error: "Producto invalido. El codigo ya existe"};
            }
    
            //Chequeo que esten todos los campos obligatorios
            if(!this.#obligatoryProperties(Object.keys(product))){
                return {error: "Producto no agregado. Faltan datos!"};
            }

            //Chequeo que los datos sean de tipo correcto
            if(!this.#checkProductData(product)){
                return {error: "Producto no agregado. Datos erroneos"};
            }
            
            //Id autoincrementable           
            (allProducts.products.length === 0) 
            ? product.id = 1 
            : product.id = allProducts.products[allProducts.products.length - 1].id + 1;
            
            //Agrego el producto
            allProducts.products.push(product);
            await fs.writeFile(this.path, JSON.stringify(allProducts));
            return {message: "Producto agregado!"};
            
        } catch (error) {
            throw new Error(`No se puede agregar el producto\n ${error.message}`);
        }
    }


    async getProducts(){
        try {
            const allProducts = await fs.readFile(this.path);
            return JSON.parse(allProducts);
        } catch (error) {
            throw new Error(`No se pueden obtener los productos\n ${error.message}`);
        }
    }


    async getProductById(id){
        try {
            const allProducts = await this.getProducts();
            const productIndex = allProducts.products.findIndex((product) => product.id === id);

            if(productIndex === -1){
                return {error: "Not found"};
            } else{
                return allProducts.products[productIndex];
            }

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
    
                await fs.writeFile(this.path, JSON.stringify(allProducts));
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
                await fs.writeFile(this.path, JSON.stringify(allProducts));
                return {message: `Se eliminó el producto con id ${id}`};   
            }
            
        } catch (error) {
            throw new Error(`No se puede eliminar el producto con id ${id}\n ${error.message}`);
        }
	}
}

module.exports = ProductManager; 