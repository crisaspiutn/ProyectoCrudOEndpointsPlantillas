var fs=require("fs")
// var Date=require("date")
let fecha={
    fecha:Date.now()
}
fs.writeFileSync("prueba.json",JSON.stringify(fecha),"utf-8")
console.log(fecha);
console.log(fecha.fecha);
let new_fecha=Date.now();
console.log(new_fecha);
////////////////// LADO DEL CLIENTE \\\\\\\\\\\\\\\\\\\\ 25/05/2022 15:58 miercoles
console.log("////////////////// LADO DEL CLIENTE //////////////////");
console.log(new Date().getTime());//        1653505134160
console.log(new Date().toTimeString());//   15:58:54 GMT-0300 (hora estándar de Argentina)
console.log(new Date().toDateString());//   Wed May 25 2022

console.log(new Date().toUTCString());//    Wed, 25 May 2022 18:58:54 GMT
console.log("los siguientes 2 son somilares");
console.log(new Date().toString());// Wed May 25 2022 15:58:54 GMT-0300 (hora estándar de Argentina)
console.log(new Date());//            Wed May 25 2022 15:58:54 GMT-0300 (hora estándar de Argentina)
console.log("////////////////// LADO DEL CLIENTE //////////////////");
console.log("2022-05-26T16:05:45.590Z           //en servidor me aparece esto en lugar del sufijo Argentina");
console.log(new Date());//            2022-05-26T16:05:45.590Z

function formatea_fecha(f) {
    return rehace_dia(f.getDay()) + " " + f.getDate() + "/" + (rehace_mes(f.getMonth())) + "/" + f.getFullYear() + "  " + f.getHours() + ":" + f.getMinutes()
}
////////////////// LADO DEL CLIENTE \\\\\\\\\\\\\\\\\\\\ 25/05/2022 15:58 miercoles

function rehace_dia(f){
    switch(f){
        case 0:return "domingo"
        case 1:return "lunes"
        case 2:return "martes"
        case 3:return "miercoles"
        case 4:return "jueves"
        case 5:return "viernes"
        case 6:return "sabado"
    }
}
function rehace_mes(f){
    switch(f){
        case 0:return "enero"
        case 1:return "febrero"
        case 2:return "marzo"
        case 3:return "abril"
        case 4:return "mayo"
        case 5:return "junio"
        case 6:return "julio"
        case 7:return "agosto"
        case 8:return "septiembre"
        case 9:return "octubre"
        case 10:return "noviembre"
        case 11:return "diciembre"
    }
}
// console.log("formatea_fecha(new Date())");
console.log(formatea_fecha(new Date()));
////////////////// LADO DEL CLIENTE \\\\\\\\\\\\\\\\\\\\

// const birthday = new Date('August 19, 1975 23:15:30');
// const date1 = birthday.getDate();

// console.log(date1);
// expected output: 19






// let palabr="alUMno";
// console.log(palabr);

// console.log(palabr.toLowerCase());

let num=3
let strin=zfill(num, 2)
console.log(strin);