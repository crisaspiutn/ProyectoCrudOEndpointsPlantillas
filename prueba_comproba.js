let list=[1,2,3]
let letra="3"
let dic={la:"dic"}

console.log(Array.isArray(dic));
function sera(){

    if (!Array.isArray) {
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(dic) === '[object Array]';
        };
    }
}


// funcion para analizar
// Object.prototype.toString.call(dic)          '[object Array]'
// creo que puede averiguar cosas que saldran por consola
// haciendo typeof o mostrando en consola
