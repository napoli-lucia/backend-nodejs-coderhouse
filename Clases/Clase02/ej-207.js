
function dividir(dividendo, divisor) {
    return new Promise((resolve, reject) => {
        if (typeof dividendo !== "number" || typeof divisor !== "number") {
            reject("alguno de los parametros no son numeros");
        }
        if(divisor === 0){
            reject("la division entre 0 no está definida");
        }
        resolve(dividendo / divisor);
    });
}

const aplicarOperacion = (param1, param2, callback) => {
    console.log("aplicando Operacion se esta ejecutando");
    let operacionRes = callback(param1, param2);
    console.log(
      `🚀 ~ file: ej-200-p2-2.js:21 ~ aplicarOperacion ~ operacionRes: ${operacionRes}`
    );
  };


dividir(12, 3)
.then((resultado) => {
    console.log(
    "🚀 ~ file: ej-200-p2-3.js:36 ~ aplicarOperacion ~ resultado:",
    resultado
    );
})
.catch((error) => {
    console.log(
    "🚀 ~ file: ej-200-p2-3.js:38 ~ aplicarOperacion ~ error:",
    error
    );
});

/*
try {
    aplicarOperacion(12, 3, dividir);
} catch (error) {
    console.log("🚀 ~ file: ej-207.js:40 ~ error:", error)
} finally {
    console.log("TERMINE DE EJECUTAR TODO");
}
*/
//el finally se ejecuta siempre


//***************************************************************/
// TODO: convertir esta funcion usando promesa
const sumar = (param1, param2) => param1 + param2;
// TODO: convertir esta funcion usando promesa
const restar = (param1, param2) => {
  return param1 - param2;
};
// TODO: convertir esta funcion usando promesa
function multiplicar(param1, param2) {
  return param1 * param2;
}


// TODO: Llamar a los metodos de multiplicar, sumar y restar usando los metodos convertidos con promesas