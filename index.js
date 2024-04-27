import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

const leerInformacion = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data)
    }
    catch (error) {
        console.log(error)
    }
}

const agregarData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    }
    catch (error) {
        console.log(error)
    }
};

app.get("/autos", (req, res) => {
    const data = leerInformacion()
    res.send(data.autos)
});

app.get("/autos/:id", (req, res) =>{
    const data = leerInformacion();
    const idPag = parseInt(req.params.id) 

    const auto = data.autos.find((auto)=> auto.id === idPag)

    res.json(auto);
})

app.post("/autos", (req, res) =>{
    const data = leerInformacion();
    const body = req.body;

    const nuevoAuto = {
        id: data.autos.length + 1,
        ...body,
    };

    data.autos.push(nuevoAuto);

    agregarData(data);

    res.json(nuevoAuto)

})

app.put("/autos/:id", (req, res) =>{
    const data = leerInformacion();
    const body = req.body;
    const id = parseInt(req.params.id);
    
    const autoIndex = data.autos.findIndex((auto) => auto.id === id);

    data.autos[autoIndex] ={
        ...data.autos[autoIndex],
        ...body,
    };

    agregarData(data)
    
    res.json({message: "Auto modificado con exito"})
})


app.delete("/autos/:id", (req, res) =>{
    const data = leerInformacion();
    const id = parseInt(req.params.id);
    const autoIndex = data.autos.findIndex((auto) => auto.id === id);
    data.autos.splice(autoIndex,1)

    agregarData(data)
    res.json({message: "Auto eliminado con exito"})
})


app.listen(3010, () => {
    console.log("El servidor esta funcionando en el puerto 3010")
})  
