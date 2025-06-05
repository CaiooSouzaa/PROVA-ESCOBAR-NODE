const express = require('express')
const route = express.Router()

const VendasController = require("../controller/vendasController")

route.get("/venda", VendasController.listarTodos)
route.get("/venda/:codigo_venda", VendasController.buscarPeloCodigo)
route.post("/venda/registrar", VendasController.registrar)
route.put("/venda/atualizar_venda", VendasController.atualizarVenda)
route.delete("/venda/deletar_venda", VendasController.deletar)


module.exports = app => app.use("/api", route)