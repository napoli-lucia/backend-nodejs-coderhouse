const ferrari = {
    brand: "Ferrari",
    price: 100,
    type: "deportivo"
};

const toyota = {
    brand: "Toyota",
    price: 70,
    type: "todoTerreno"
};

const nissan = {
    brand: "Nissan",
    price: 93,
    type: "deportivo",
    color: "black",
    tuning: true,
    transmition: "manual"
};

//Construimos el arreglo de cars
const cars = [ferrari, toyota, nissan];
console.log("🚀 ~ file: ej-201.js:21 ~ cars:", cars)

//const {brand, price, type} = ferrari;
//console.log("🚀 ~ file: ej-201.js:24 ~ destructuring:", brand, price, type)
console.log(
    "🚀 ~ file: ej-201.js:26 ~ destructuring:",
    ferrari.brand,
    ferrari.price,
    ferrari.type
  );

const {brand, price, type, ...nissanValues} = nissan;
console.log("🚀 ~ file: ej-201.js:36 ~ destructuring:", brand, price, type)
console.log("🚀 ~ file: ej-201.js:37 ~ nisanValues:", nissanValues)
//Aca estoy usando el rest operator
//Solo funciona para objetos

const persona = {
  name: "luis",
  age: 29,
};

const { name, age, ...personValues } = persona;
console.log("🚀 ~ file: ej-201.js:46 ~ personValues:", personValues);
//Devuelve un objeto vacio -> {}


const carsSpread = [{ ...ferrari }, { ...toyota }, { ...nissan }];
console.log("🚀 ~ file: ej-201.js:51 ~ carsSpread:", carsSpread);
//Se copia todas las propiedades en un objeto nuevo


const team = {
    name: "real madrid",
    year: 1900,
  };
console.log("🚀 ~ file: ej-201.js:59 ~ team:", team);
  
const team2 = { ...team };
team2.name = "Milan";
console.log("🚀 ~ file: ej-201.js:63 ~ team2:", team2);


const team3 = team;
console.log("🚀 ~ file: ej-201.js:58 ~ team3:", team3);
team3.year = 2000;
console.log("🚀 ~ file: ej-201.js:60 ~ team:", team);
//Aca copie el objeto sin hacerlo independiente
//El operador spread { ...team } me evita esto 