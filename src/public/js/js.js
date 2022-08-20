const ver = document.getElementById("btn-list")
const lista = document.getElementById("lista-palabras")
const add = document.getElementById("btn-add")
ver.addEventListener("click", function() {
    console.log("toque ver");
    lista.style.display = "none"
})
add.addEventListener("click", function() {
    console.log("toque add");
    lista.style.display = "inherit"
})
// --------------------- CONTROLES ------------------------
// ------------------ RECOGIENDO DATOS --------------------
async function obtiene() {
    let dato = await fetch("/dat")
    dato = await dato.json()
    return dato
}
async function ver_promesa(funcionx) {
    console.log(await funcionx());
}
ver_promesa(obtiene);
var lista_datos_completos={}
obtiene().then(dat=>{carga_articulos(dat)})
function carga_titulos_de_columnas(lista_x){

    let titulos1=document.createElement("tr");
    titulos1.innerHTML=`
                <th rowspan="2">btn repa</th>
                <th rowspan="2">btn modifi</th>
                <th rowspan="2">estado</th>
                <th colspan="3">tiempos</th>
                <th rowspan="2">en ingles</th>
                <th rowspan="2">pronuncia</th>
                <th colspan="5">en español</th>
                <th rowspan="2">ambito</th>
                <th rowspan="2">caracteris</th>`;
    let titulos2=document.createElement("tr");
    titulos2.innerHTML=`
            <th>creacion</th>
                <th>ultimo repaso</th>
                <th>cuando repasar</th>
                <th>como verbo</th>
                <th>como sustantivo</th>
                <th>como adjetivo</th>
                <th>como adverbio</th>
                <th>como preposicion</th>
    `;
    lista_x.appendChild(titulos1)
    lista_x.appendChild(titulos2)
}
function carga_articulos(dato_fetch){
    lista.innerHTML="";
    carga_titulos_de_columnas(lista)
    lista_datos_completos=dato_fetch;
    let llaves=Object.keys(lista_datos_completos).reverse()
    for (let i = 0; i < llaves.length; i++) {
        crea_articulo(lista_datos_completos[llaves[i]])
    }
}
function crea_articulo(datos_item){
    var item=document.createElement("tr")
    item.innerHTML=`
    <div class="detail">
    <p><strong>en ingles&nbsp;</strong><span>${datos_item.ing}</span></p>
    <p><strong>en español:&nbsp;</strong>${datos_item.esp}</p>
    <p><strong>caracteristica:&nbsp;</strong>${datos_item.caract}</p>
    <p><strong>tipo:&nbsp;</strong>${datos_item.tipo}</p>
    <p><strong>ambito:&nbsp;</strong>${datos_item.ambito}</p>
    </div>
    `
    let div_control=document.createElement("div")
    div_control.className="control";
    div_control.innerHTML=`
    <p><strong>fecha de creacion:&nbsp;</strong><span class="fecha">${formatea_fecha(new Date(datos_item.time_create))}</span></p>
    <p><strong>el ultimo repaso fue:&nbsp;</strong><span class="fecha">${formatea_fecha(new Date(datos_item.time_repaso))}</span></p>
    <p><strong>cuando repasare:&nbsp;</strong><span class="fecha">${formatea_fecha(new Date(datos_item.time_repaso+(datos_item.time_espera*60*1000)))}</span></p>
    `;
    let p_temp=document.createElement("p");
    p_temp.innerHTML=`<strong>tiempo restante:&nbsp;</strong>`;
    let span_temp=document.createElement("span");
    // span_temp.className="espera";
    // span_temp.innerText=(datos_item.time_espera*60);
    // reduce_x_seg(span_temp);

    let span_extra=document.createElement("span")
    span_extra.innerHTML="&nbsp;&nbsp;&nbsp;En:&nbsp;"+datos_item.time_espera+" minutos";
    // span_extra.innerText="    "+datos_item.time_espera+" minutos";

    
    
    let button_repasa=document.createElement("button")
    button_repasa.textContent="repasado";
    let button_modifi=document.createElement("button")
    button_modifi.textContent="modificar";
    let span_estado=document.createElement("span");
    span_estado.className="estado";
    if(datos_item.time_repaso+(datos_item.time_espera*60*1000)-new Date().getTime()<=0){
        console.log("Ya puedes repasar");
        span_estado.innerText="Ya puedes repasar";
        span_temp.innerText=0
    }else{
        span_estado.innerText="Espera";
        console.log((new Date().getTime()-datos_item.time_repaso)/1000);//no sirve
        span_temp.innerText=parseInt(((datos_item.time_espera*60*1000)-(new Date().getTime()-datos_item.time_repaso))/1000)
        reduce_x_seg(span_temp,span_estado);
    }
    p_temp.appendChild(span_temp)
    p_temp.appendChild(span_extra)
    div_control.appendChild(p_temp)
    div_control.appendChild(button_repasa)
    div_control.appendChild(button_modifi)
    div_control.appendChild(span_estado)
    item.appendChild(div_control)
    lista.appendChild(item)
}

lista.addEventListener("click", function(e) {
        if (e.target.innerText == "repasado"){
            let llave=e.target.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].innerText;
            console.log("llave");
            console.log(llave);
            fetch('/subenivel',{
                method:"put",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    ing:llave,
                    time_repaso:new Date().getTime()
                })
            })
            .then(data=>console.log("estado c: "+data.status))
            console.log(e.target.tagName);
            location.reload()
        }

        // console.log(e.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].innerText); // 1
    })
// ------------------ RECOGIENDO DATOS --------------------
// ------------------- FORMATEO FECHA ---------------------
    
const lista_fechas = document.getElementsByClassName("fecha")
console.log(lista_fechas.length);

// formatea_fecha funcion de otra hoja
// console.log(formatea_fecha(new Date()));
for (let i = 0; i < lista_fechas.length; i++) {
    console.log(formatea_fecha(new Date(parseInt(lista_fechas[i].innerText))));
    // console.log( lista_fechas[i].innerText ); // tiene numeros
    // console.log(new Date(parseInt( lista_fechas[i].innerText )));
    lista_fechas[i].innerText = formatea_fecha(new Date(parseInt(lista_fechas[i].innerText)))
}
// ------------------- FORMATEO FECHA ---------------------
// ------------------- INICIA RELOJES ---------------------

const lista_espera = document.getElementsByClassName("espera")
for (let i = 0; i < lista_espera.length; i++) {
    // lista_espera[i].innerText=parseInt(lista_espera[i].innerText)
    reduce_x_seg(lista_espera[i])
}

function reduce_x_seg(objeto,estado) {// revisa el objeto que se le da y si sus segundos
    setTimeout(() => {
        let segundos = parseInt(objeto.innerText)
        objeto.innerText = --segundos
        if (segundos != 0) reduce_x_seg(objeto,estado)
        else {
            console.log("fin con", segundos);
            document.getElementById("audio").play()
            estado.innerText=" Ya puedes empezar"
        }
    }, 1000);
}
// ------------------- INICIA RELOJES ---------------------
// ------------------------ TEST --------------------------
function cambia_tiempo() {
    // lista_espera[1].innerText = 10
    location.reload()
}

function cambia_tiempo_auto() {
    setTimeout(() => {
        lista_espera[1].innerText = 10
    }, 5000);
}
const boton = document.getElementById("boton-sube")
boton.addEventListener("click", cambia_tiempo)




// const form = document.getElementById("envia")
// form.addEventListener("click", function(e) {
//     e.preventDefault();
//     if (!lista_datos_completos.hasOwnProperty(  "cat".toLowerCase())) {
//         fetch("/add", {
//                 method: "post",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     ing: document.getElementById("ing").value,
//                     esp: document.getElementById("esp").value,
//                     caract: document.getElementById("caract").value,
//                     tipo: document.getElementById("tipo").value,
//                     ambito: document.getElementById("ambito").value
//                 })
//             })
//             .then(dat => dat.text())
//             .then(x => { console.log(x); })
//         lista_datos_completos[document.getElementById("ing").value]={
//             ing: document.getElementById("ing").value,
//             esp: document.getElementById("esp").value,
//             caract: document.getElementById("caract").value,
//             tipo: document.getElementById("tipo").value,
//             ambito: document.getElementById("ambito").value,
//             time_create:new Date().getTime(),
//             time_repaso:new Date().getTime(),
//             time_espera:2
//         }
//         // crea_articulo(lista_datos_completos[document.getElementById("ing").value])
//         carga_articulos(lista_datos_completos)
//     }
// })