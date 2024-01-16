//Distintas maneras de escribir las funciones

//Arrow function con retorno implicito
const sumar = (param1, param2) => param1 + param2;

//Arrow function con retorno explicito
const restar = (param1, param2) => {
  return param1 - param2;
};

function multiplicar(param1, param2) {
  return param1 * param2;
}
function dividir(param1, param2) {
  return param1 / param2;
}

const aplicarOperacion = (param1, param2, callback) => {
    console.log("aplicando Operacion se esta ejecutando");
    let operacionRes = callback(param1, param2);
    console.log(
      `🚀 ~ file: ej-200-p2-2.js:21 ~ aplicarOperacion ~ operacionRes: ${operacionRes}`
    );
  };

aplicarOperacion(10, 20, sumar);
aplicarOperacion(10, 20, (param1, param2) => param1 + param2);

aplicarOperacion(20, 1, restar);

aplicarOperacion(5, 5, multiplicar);

aplicarOperacion(7, 2, dividir);


//La funcion aplicarOperacion es muy parecida a lo que hace el map, filter por detras
//La diferencia es que en esas funciones se aplican a cada uno de los elementos del arreglo

