//async-await

function dividir2(dividendo, divisor) {
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
        let result = await dividir(12, 0)
        console.log("🚀 ~ callAsyncFunction ~ result:", result)
    } catch (error) {
        //todo lo q sea error o un reject
        console.log("🚀 ~ error:", error)
    } finally {
        console.log("termine de ejecutar mi promesa con async-await");
    }
}

callAsyncFunction();


