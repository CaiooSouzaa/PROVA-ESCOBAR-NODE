const express = require('express')

var route = express.Router()

var produtoController = require("../controller/produtoController")

route.get("/produto", produtoController.listarTodos)
route.get("/produto/{:codigo}", produtoController.buscarProduto)
route.post("/produto/registrar", produtoController.registrarProduto)
route.put("/produto/atualizar_produto", produtoController.atualizarProduto)
route.delete("/produto/deletar", produtoController.deletar)


module.exports = app => app.use("/api", route)