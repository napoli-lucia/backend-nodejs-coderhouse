const saludar = () => {
    console.log("🚀 ~ file: fs-01.js:4 ~ saludar")
}

const comoEstas = (nombre) => {
    console.log("🚀 ~ file: fs-01.js:6 ~ comoEstas:", nombre)
}

const NOMBRE = 'FAUSTO'

//codigo sincrono - bloqueante
//saludar();
//comoEstas(NOMBRE);

/***************************************************/

//codigo asincrono - no bloqueante

const esperar = (timer, callback) => {
    setTimeout(()=>{
        callback();
    }, timer);
};

comoEstas(NOMBRE);
esperar(3000, saludar);
esperar(2000, () => console.log("callback version arrow function"));
console.log("TERMINE LA EJECUCION");