const express = require('express')

var route = express.Router()

var ProdutoDb = require("../model/produto")

route.get("/produto", async(req, res) =>{
    var produto = await ProdutoDb.find()
    return res.send(produto)
})

module.exports = app => app.use("/api", route)