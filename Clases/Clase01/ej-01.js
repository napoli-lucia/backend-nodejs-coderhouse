let i = 0;
console.log("🚀 ~ mifuncion ~ i inicial:", i)

function mifuncion() {
    
    i = 1;
    j = 2;

    if (true) {
        console.log("🚀 ~ mifuncion ~ i:", i);
        console.log("🚀 ~ mifuncion ~ j:", j)
    }
}

mifuncion();
//console.log("🚀 ~ mifuncion ~ i fuera de la funcion:", i)
//console.log("🚀 ~ mifuncion ~ j fuera de la funcion:", j)


//*******************/

function scopeFunction() {
  // scope de la funcion mifuncion
  let i = 0;

  if (true) {
    // scope del if
    let i = 1; //--> 1
    console.log("🚀 ~ file: ej-01.js:40 ~ i:", i);
  }
  i = i + 2; //--> 2
  console.log("🚀 ~ file: ej-01.js:43 ~ scopeFunction ~ i:", i);
}

scopeFunction();


/*
function foo() {
  if (true) {
    let nombre = "rabin";
    console.log("🚀 ~ file: ej-01.js:35 ~ foo ~ nombre:", nombre);
  }
  console.log("🚀 ~ file: ej-01.js:87 ~ foo ~ nombre:", nombre);
}

foo();
//ReferenceError: nombre is not defined
*/