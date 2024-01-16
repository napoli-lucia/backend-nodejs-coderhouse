//Trim limpia los espacios de un string
const message = " Hola, como estas        ";
console.log(
  "🚀 ~ file: ej-203.js:2 ~ message:",
  message.trim(),
  message.trim().length,
  message,
  message.length);


//Flat saca niveles
let arrayCombinado = [
  123,
  51,
  2,
  5,
  6,
  [2, 7, 8, 31, 0, -22],
  [
    [25, 1],
    [-1, 4],
  ],
];

console.log(
  "🚀 ~ file: ej-203.js:26 ~ arrayCombinado:",
  arrayCombinado.flat()
);

console.log(
  "🚀 ~ file: ej-203.js:31 ~ arrayCombinado:",
  arrayCombinado.flat(2)
);