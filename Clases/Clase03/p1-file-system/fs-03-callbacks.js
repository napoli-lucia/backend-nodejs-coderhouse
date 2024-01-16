// fs con callbacks
// Operacion sobre archivos de forma ASINCRONA con callbacks

const fs = require('fs');

fs.readFile(`${process.cwd()}/prueba.txt`, "utf-8", (err, content) => {
    if (err) {
        console.log("🚀 ~ file: fs-03.js:8 ~ fs.readFile ~ err:", err)
    } else {
        console.log("🚀 ~ file: fs-03.js:10 ~ fs.readFile ~ content:", content)
    }
})

fs.writeFile(
    `${process.cwd()}/prueba-03.txt`,
    `HOLA ESTOY ESCRIBIENDO EN UN ARCHIVO EL DIA ${new Date().toLocaleDateString()} V2`,
    (err) => {
        if (err) {
            console.log("🚀 ~ file: fs-03.js:19 ~ err:", err);
        }
  }
)
//si no existe lo crea y escribe
//si ya existe lo reemplaza escribiendo lo nuevo