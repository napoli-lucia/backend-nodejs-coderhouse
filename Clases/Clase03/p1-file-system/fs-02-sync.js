// Operacion sobre archivos de forma SINCRONA

const fs = require('fs') //sincrona, callbacks o promesas
const path = require('path');

try {
    const pathFile = path.join(__dirname, "prueba-02.txt")
    console.log("🚀 ~ file: fs-02.js:8 ~ pathFile:", pathFile)
    const contentFile = fs.readFileSync(pathFile, "utf-8")
    console.log("🚀 ~ file: fs-02.js:10 ~ contentFile:", contentFile)
} catch (error) {
    console.log("🚀 ~ file: fs-02.js:12 ~ error:", error)
}