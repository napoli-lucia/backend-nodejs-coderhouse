class ProductManager{
    constructor(){
        this.products = [];
    }

    #allProperties(props){
        const allProps = [ 'title', 'description', 'price', 'thumbnail', 'code', 'stock' ];
    
        if(props.length === allProps.length && props.every((val, index) => val === allProps[index])){
            return true;
        } else{
            return false;
        }
    }    

    addProduct(product){
        //Chequeo que el codigo no se repita
        const codigos = this.products.map((product) => product.code);
        if(codigos.includes(product.code)){
            console.log('Producto invalido. El codigo ya existe');
            return;
        }

        //Chequeo que esten todos los campos
        if(!this.#allProperties(Object.keys(product))){
            console.log('Producto no agregado. Faltan datos!');
            return;
        }

        //Id autoincrementable
        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }
        
        this.products.push(product);
        console.log("Producto agregado!");
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const productId = this.products.findIndex((product) => product.id === id);

        (productId === -1) ? console.log("Not found") : console.log(this.products[productId]);
    }
}


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


const manager = new ProductManager();

console.log("Sin productos:");
console.log(manager.getProducts());
console.log("-----------------------------------------------");
console.log("Añado los productos:");
manager.addProduct(product1); //valido
manager.addProduct(product2); //NO valido -> le falta stock
manager.addProduct(product3); //NO valido -> le falta descripcion
manager.addProduct(product4); //valido
console.log("-----------------------------------------------");
console.log("Todos los productos:");
console.log(manager.getProducts());
console.log("-----------------------------------------------");
console.log("Intento agregar producto con codigo ya existente");
manager.addProduct(product5);
console.log("-----------------------------------------------");
console.log("Busco producto con id 2");
manager.getProductById(2);
console.log("-----------------------------------------------");
console.log("Busco producto con id 7, que no existe");
manager.getProductById(7);