const express = require('express')
var route = express.Router()

var clienteController = require("../controller/clienteController")

route.get("/cliente", clienteController.listatarTodos)
route.get("/cliente/:nome", clienteController.buscarPeloNome)
route.post("/cliente/registrar", clienteController.registrarCliente)
route.put("/cliente/atualizar_cliente", clienteController.atualizarCliente)
route.delete("/cliente/deletar", clienteController.deletar)

module.exports = app => app.use("/api", route)