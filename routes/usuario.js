const express = require('express')

var route = express.Router()

var UsuarioDb = require("../model/usuario")

//BUSCA DE TODOS OS USUARIOS
route.get("/usuario", async (req, res) => {
    var usuario = await UsuarioDb.find()
    return res.send(usuario)
})

//BUSCA PERSONALIZADA PELO USUARIO PASSANDO O NOME VIA GET
route.get("/usuario/:nome", async (req, res) => {
    const usuario = req.params.nome || ""

    if (usuario) {
        var usuarios = await UsuarioDb.find({ nome: { $regex: usuario, $options: "i" } })
    } else {
        var user = req.params.nome
        console.log(user)
    }

    return res.send(usuarios)
})

//CADASTRO DO USUARIO VIA POST
route.post("/registrar", async (req, res) => {
    var { nome, email, senha, confirmar_senha } = req.body

    var msg = "Alguns campos não estão preenchidos ou os dados não são coerentes, por favor verificar se todos os dados estão corretos e preenchidos"

    if (nome === undefined || nome === "") {
        return res.send(msg)
    }

    if (email === undefined || email === "") {
        return res.send(msg)
    }

    if (senha === undefined || senha === "") {
        return res.send(msg)
    }

    if (confirmar_senha === undefined || confirmar_senha === "") {
        return res.send(msg)
    }

    var retorno = await UsuarioDb.insertOne({ nome, email, senha })

    if (retorno != undefined || retorno != null) {
        return res.send("Cadastro efetuado com sucesso✅")
    } else {
        return res.send("Erro ao cadastrar")
    }
})

//ACESSO A PLATAFORMA VIA LOGIN PASSANDO OS DADOS POR POST
route.post("/login", async (req, res) => {
    var { email, senha } = req.body

    var msgErro = "Alguns campos não estão preenchidos ou os dados não são coerentes, por favor verificar se todos os dados estão corretos e preenchidos"

    if (email === undefined || email === "") {
        return res.send(msgErro)
    }

    if (senha === undefined || senha === "") {
        return res.send(msgErro)
    }

    var retorno = await UsuarioDb.findOne({ email })

    if (retorno === null) {
        return res.send({ error: "Usuario e/ou senha invalida" })
    }

    if (retorno.senha != senha) {
        return res.send({ error: "Usuario e/ou senha invalida" })
    }

    return res.send({ token: "Ok" })
})

//ATUALIZAR CADASTRO DE USUARIO
route.put("/atualizar_cadastro", async (req, res) => {
    var { nome, email, senha, confirmar_senha } = req.body

    var msg = "Alguns campos não estão preenchidos ou os dados não são coerentes, por favor verificar se todos os dados estão corretos e preenchidos"

    if (nome === undefined || nome === "") {
        return res.send(msg)
    }

    if (email === undefined || email === "") {
        return res.send(msg)
    }

    if (senha !== confirmar_senha) {
        return res.send(msg)
    }

    var retorno = await UsuarioDb.findOneAndUpdate({ email }, { nome, senha }, { new: true })

    if (retorno === null) {
        var msg = "Algo deu errado, confirmar suas credenciais corretamente"
        return res.send(msg)
    }

    return res.send({ message: "Dados atualizados" })
})

//DELETAR USUARIO
route.delete("/deletar", async (req, res) => {
    var { _id } = req.body

    if (_id == undefined || _id == "") {
        return res.send({ error: "Id do usuario não encontrada" })
    }

    var retorno = await UsuarioDb.deleteOne({ _id})

    if (retorno == null) {
        return res.send({ error: "Erro ao excluir" })
    }

    return res.send({ message: "usuario removido com sucesso" })
})

module.exports = app => app.use("/api", route)