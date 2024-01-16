//Promises and stringtify parse

//const fs = require('fs').promises;
const fs = require("fs");
const path = require("path");



const readFilePromise = new Promise((resolve, reject) => {
    const pathFile = path.join(__dirname, `package.json`);
    fs.readFile(pathFile, "utf-8", (err, content) => {
      if (err) {
        reject("error leyendo el archivo");
      }
      resolve(content);
    });
});


const writePromise = (content) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, `info.json`), content, (err) => {
        if (err) {
          reject("fallo en la escritura del archivo");
        }
        resolve();
      });
    });
};





/*
const executeAsync = async () => {
    try {
      const result = await readFilePromise;
      console.log("🚀 ~ executeAsync ~ result:", result)
    } catch (error) {
      console.log(
        "🚀 ~ file: fs-04-fs-promises-then-and-catch.js:37 ~ executeAsync ~ error:",
        error
      );
    }
};
*/

/*
const executeAsync = async () => {
  try {
    const result = await readFilePromise;
    console.log("🚀 ~ executeAsync ~ result:", result);
    
    const resultStr = JSON.stringify(result);
    console.log("🚀 ~ executeAsync ~ resultStr:", resultStr);

    const object = JSON.parse(resultStr);
    console.log("🚀 ~ executeAsync ~ object:", object);
    

  } catch (error) {
    console.log(
      "🚀 ~ file: fs-04-fs-promises-then-and-catch.js:37 ~ executeAsync ~ error:",
      error
    );
  }
};
*/


const executeAsync = async () => {
  try {
    const result = await readFilePromise;
    const resultObject = JSON.parse(result);
    resultObject.content = "practice"; // AGREGANDO UNA PROPIEDAD AL OBJECT

    const resultStr = JSON.stringify(resultObject);
    await writePromise(resultStr);

  } catch (error) {
    console.log(
      "🚀 ~ file: fs-04-fs-promises-then-and-catch.js:35 ~ executeAsync ~ error:",
      error
    );
  }
};

executeAsync();