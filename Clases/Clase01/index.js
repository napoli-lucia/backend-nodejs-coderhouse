console.log('BIENVENIDOS A SU CURSO CODER');

console.warn('PREPARASE A APRENDER');

console.error('si te equivocas esta bien, lo importante es seguir intentando');

console.log(1);
console.log("a");
console.log("nombre");
console.log(true);
console.log(null);
console.log(undefined);
console.log([1,2,3,4]);
console.log({nombre: "rabin", apellido: "ferreira"});

var a = 2;
console.log("🚀 ~ file: index.js:17 ~ a:", a)


var personas = [
    {
      name: "jose",
      edad: 21,
      pelicula: "AVATAR",
      salario: 201.43,
      fecha: new Date(),
    },
    { name: "maria", edad: 18, pelicula: "AVATAR 2", salario: 10.3 },
    { name: "Sergio", edad: 30, pelicula: "REY LEON", salario: 400.67 },
    { name: "Valeria", edad: 28, pelicula: "SPIDERMAN", salario: 150.11 },
  ];
  console.log('🚀 ~ personas:', personas);
  
  console.table(personas);
  console.table(personas[2]);
  console.log("🚀 ~ personas:", personas[2].name);