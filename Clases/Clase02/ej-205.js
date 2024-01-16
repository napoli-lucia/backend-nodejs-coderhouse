const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 190, 19, 10];

const numerosPares = numbers.filter((num) => num % 2 === 0);
console.log("🚀 ~ file: ej-200-p2-1.js:4 ~ numerosPares:", numerosPares);

const isOdd = (num) => num % 2 === 0;

const numerosParesParametrosImplicitos = numbers.filter(isOdd);
console.log(
  "🚀 ~ file: ej-200-p2-1.js:9 ~ numerosParesParametrosImplicitos:",
  numerosParesParametrosImplicitos
);

// ESTE LLAMADO DEL CALLBACK ES UN ERROR
// porque el num no esta definido
// const numerosParesParametrosExplicitos = numbers.filter(isOdd(num));
// console.log(
//   "🚀 ~ file: ej-200-p2-1.js:16 ~ numerosParesParametrosExplicitos:",
//   numerosParesParametrosExplicitos
// );

const numerosParesParametrosExplicitos = numbers.filter((num) => isOdd(num));
console.log(
  "🚀 ~ file: ej-200-p2-1.js:22 ~ numerosParesParametrosExplicitos:",
  numerosParesParametrosExplicitos
);


const newNumbers = numbers.map((x) => x + 1);