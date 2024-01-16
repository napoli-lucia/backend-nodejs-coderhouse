const fs = require("fs");


const promiseWrite = new Promise((resolve, reject) => {
    const content = "hola estoy usando promesas para escribir un archivo con Node";
    fs.writeFile(`${process.cwd()}/fs_write_promise.txt`, content, (err) => {
      if (err) {
        reject("falló la escritura del archivo");
      }
      resolve();
    });
});


promiseWrite
  .then(() => {
    console.log("WRITE FILE USING PROMISES");
  })
  .catch((err) => {
    console.log("🚀 ~ file: fs-04-fs-promises-then-and-catch.js:20 ~ promiseWrite.then ~ err:", err);
});

const executeAsync = async () => {
    try {
      await promiseWrite;
    } catch (error) {
      console.log("🚀 ~ file: fs-04-fs-promises-then-and-catch.js:29 ~ executeAsync ~ error:",error);
    }
 };
  
executeAsync();