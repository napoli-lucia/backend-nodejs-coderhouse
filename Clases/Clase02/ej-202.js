const canastas = [
  {
    manzanas: 2,
    peras: 4,
    carnes: 2,
    dulces: 10,
  },
  {
    manzanas: 8,
    peras: 2,
    carnes: 11,
    dulces: 2,
  },
  {
    manzanas: 1,
    peras: 2,
    carnes: 11,
    dulces: 2,
  },
];
const canastaManzanas = canastas.map((canasta) => canasta.manzanas);
console.log("🚀 ~ file: ej-202.js:22 ~ canastaManzanas:", canastaManzanas);

console.log(Object.values(canastas));

//Array con las cantidades de cada canasta
const soloManzanas = canastas.map( (canasta) => Object.values(canasta)[0] )
console.log("soloManzanas: ", soloManzanas);

//Con arrow function
let sumaManzanas = 0;
soloManzanas.forEach((element) => {
  //console.log(element);
  sumaManzanas+=element;
});
console.log("sumaManzanas: ",sumaManzanas)



//Con for
let suma = 0;
for (let i = 0; i < soloManzanas.length; i++) {
  const element = soloManzanas[i];
  suma+=soloManzanas[i];
}
console.log("suma: ",suma);


//Con reduce
const contarManzanas = canastas.reduce((acc, item) => {
  return (acc += item.manzanas);
}, 0);
console.log(contarManzanas);