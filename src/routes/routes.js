const express=require("express");
const router=express.Router();
const path=require("path");
const fs=require("fs")

var lista=JSON.parse(fs.readFileSync(path.join(__dirname,"../base/lista.json"),"utf-8")) 

router.get("/",(req,res)=>{
    res.render("inicio",{
        titulo:"tit xd",
        pagina:"page xd",
        lista:lista// si le damos diccionario lo convierte en lista con valores
    })
    let daux=new Date()
    console.log(daux);
    console.log("entro en "+daux.getHours()+':'+daux.getMinutes());
})
router.get("/dat",(req,res)=>{
    res.json(lista)
})
router.post("/add",(req,res)=>{
    console.log(req.body);
    // console.log(req.params);
    // let dicc={}
    if(!lista.hasOwnProperty(  req.body.ing.toLowerCase())){
        console.log(req.body.ing+"    no existia, lo agregare");
        lista[req.body.ing.toLowerCase()]=
            {
                ing:req.body.ing.toLowerCase(),
                esp:req.body.esp,
                caract:req.body.caract,
                tipo:req.body.tipo,
                ambito:req.body.ambito,
                time_create:Date.now(),
                time_repaso:Date.now(),
                time_espera:2
            }
        res.status(200).send("bien")
        // res.status(200).send("bien")
    }
    else{
        console.log(req.body.ing+"    ya existe, no lo agregare");
        res.status(202).send("mal")
    }

})
router.put("/subenivel",(req,res)=>{
    let llave=req.body.ing;
    if (lista.hasOwnProperty(  req.body.ing.toLowerCase())) {
        lista[req.body.ing].time_repaso=req.body.time_repaso;
        lista[req.body.ing].time_espera=lista[req.body.ing].time_espera*2;
        res.sendStatus(200);
    }else{
        console.log("no se encuentra la clave");
    }
})
function guarda(){
    setTimeout(() => {
        fs.writeFileSync(path.join(__dirname,"../base/lista.json"),JSON.stringify(lista))
        guarda()
    }, 2000);
}
guarda();
module.exports=router