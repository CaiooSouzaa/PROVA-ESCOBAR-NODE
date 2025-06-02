const express = require('express')

var route = express.Router()

var UsuarioDb = require("../model/usuario") 

route.get("/usuario_rotas", async(req, res)=>{
    var usuario = await UsuarioDb.find()
    return res.send(usuario)
})

route.get("/usuario_rotas/:nome", async (req,res) => {
    const usuario = req.params.nome || ""

    if(usuario){
        var usuarios = await UsuarioDb.find({nome:{$regex: usuario, $options: "i"}})
    }else{
        var user = req.params.nome
        console.log(user)
    }

    return res.send(usuarios)
})



module.exports = app => app.use("/api", route)