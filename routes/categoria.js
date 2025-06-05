const express = require('express')

var route = express.Router()
var categoriaController = require("../controller/categoriaController")

route.get("/categoria", categoriaController.listarTodos)
route.get("/categoria/:nome", categoriaController.buscaNomeCategoria)
route.post("/categoria/registrar", categoriaController.registrar)
route.put("/categoria/atualizar_cadastro", categoriaController.atualizaCliente)
route.delete("/categoria/deletar", categoriaController.delete)

module.exports = app => app.use("/api", route)