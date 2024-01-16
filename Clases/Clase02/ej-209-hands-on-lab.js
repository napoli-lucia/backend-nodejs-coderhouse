//Suma
const sumar = async (param1, param2) => {
    return new Promise((resolve, reject) => {
        if (param1 === 0 || param2 === 0) {
            reject("Operación innecesaria");
        }
        resolve(param1 + param2);
    });
};

// TODO: hacer funcion de resta y multiplicar

//Dividir
async function dividir(dividendo, divisor) {
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

const callAsyncFunction = async () => {
    try {
        let resultDivision = await dividir(12, 1);
        console.log("🚀 ~ callAsyncFunction ~ result:", resultDivision)

        let resultSuma = await sumar(100,200);
        console.log("🚀 ~ callAsyncFunction ~ resultSuma:", resultSuma)
    } catch (error) {
        //todo lo q sea error o un reject
        console.log("🚀 ~ error:", error)
    } finally {
        console.log("termine de ejecutar mi promesa con async-await");
    }
}

callAsyncFunction();