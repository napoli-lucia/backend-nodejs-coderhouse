const cars = [
    {
        brand: "Ferrari",
        price: 100,
        type: "deportivo"
    },
    {
        brand: "Toyota",
        price: 70,
        type: "todoTerreno"
    },
    {
        brand: "BMW",
        price: 93,
        type: "deportivo"
    },
    {
        brand: "Nissan",
        price: 50,
        type: "todoTerreno"
    }
];


//Type
const carsType = cars.map( (car) => car.type.toLocaleLowerCase() )
console.log(carsType)
console.log("carsType:", carsType);
console.log("carsType:"+ carsType);

const typeSearch = "deportivo"
if (carsType.includes(typeSearch)) {
    console.log("Existen modelos deportivos");
} else {
    console.log("No existen modelos deportivos");
}


//Prices
const carsPrices = cars.map( (car) => car.price )
console.log("🚀 ~ file: ej-200.js:41 ~ carsPrices:", carsPrices)
console.log(
    "🚀 ~ file: ej-200.js:43 ~ Potence:", 
    cars[3].price**2,
    carsPrices[3]**2);

console.log('USING OBJECT.KEYS METHOD', Object.keys(cars)); //aplicado en un objeto
console.log('USING OBJECT.KEYS METHOD', Object.keys(cars[0])); //aplicado en array

console.log('USING OBJECT.VALUES METHOD', Object.values(cars));
console.log('USING OBJECT.VALUES METHOD', Object.values(cars[0]));

console.log('USING OBJECT.ENTRIES METHOD', Object.entries(cars[0])); //crea una matriz
console.log('USING OBJECT.ENTRIES METHOD', Object.entries(cars));

console.table(Object.values(cars));

const carsIndexed = cars.reduce((accumulator, item, index) => {
    return {
        ...accumulator, //spread operator
        [index]: item,
    };
}, {});
console.log(
    "🚀 ~ file: ej-200.js:65 ~ carsIndexed ~ carsIndexed:", 
    carsIndexed,
    carsIndexed["3"]);

