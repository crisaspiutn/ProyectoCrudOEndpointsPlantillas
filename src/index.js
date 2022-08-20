const express=require("express")
const path=require("path")
// const fs=require("fs")
const hbs=require("hbs")
const app=express()
// datos
// var lista=JSON.parse(fs.readFileSync(path.join(__dirname,"base/lista.json"),"utf-8")) // lo termino usando en otra ruta
app.set("port",3000)
hbs.registerPartials(path.join(__dirname,"hbs/html"),function(error){})
app.set("view engine","hbs")
app.set("views",path.join(__dirname,"hbs"))

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", require("./routes/routes"))


app.use(express.static(path.join(__dirname,"public")))

app.listen(app.get("port"),function(){console.log(app.get("port"));})