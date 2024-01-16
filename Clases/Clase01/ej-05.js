class Persona{
    static especie = 'humano';

    constructor(nombre, pais){
        this.nombre = nombre;
        this.pais = pais;
        this.edad = 20;
    }
    
    saludo(){
        console.log("🚀 ~ Persona ~ constructor ~ nombre:", this.nombre)
        return "hola, como estas?"
    }

    dondeVivo(){
        return `vivo en ${this.pais} y tengo ${this.edadMetodo()} anios`
    }

    dondeVivoV2(){
        return `vivo en ${this.pais} y tengo ${this.edadMetodo2()} anios`
    }

    edadMetodo(){
        return this.edad;
    }

    edadMetodo2 = () => this.edad;
    //los arrow function no tienen acceso al this
}

/*
const p1 = new Persona()
console.log("🚀 ~ file: ej-05.js:12 ~ p1:", p1)
console.log("🚀 ~ file: ej-05.js:13 ~ p1:", p1.especie)
*/

const p1 = new Persona('rabin', 'ESP')
console.log("🚀 ~ file: ej-05.js:12 ~ p1:", p1)
console.log("🚀 ~ file: ej-05.js:13 ~ p1:", p1.nombre)
//console.log("🚀 ~ file: ej-05.js:13 ~ p1:", p1.saludo)
console.log("🚀 ~ file: ej-05.js:13 ~ p1:", p1.saludo())
console.log("🚀 ~ file: ej-05.js:13 ~ p1:", p1.dondeVivo())
console.log("🚀 ~ file: ej-05.js:13 ~ p1:", p1.dondeVivoV2())
