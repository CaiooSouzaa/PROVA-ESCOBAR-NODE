const UsuarioDb = require("../model/usuario")

module.exports = {
    //BUSCA DE TODOS OS USUARIOS
    listatarTodos: async (req, res) => {
        const usuario = await UsuarioDb.find()
        return res.send(usuario)
    },

    //BUSCA PERSONALIZADA PELO USUARIO PASSANDO O NOME VIA GET
    buscarPeloNome: async (req, res) => {
        const nome = req.params.nome || ""

        if (nome) {
            const usuarios = await UsuarioDb.find({ nome: { $regex: nome, $options: "i" } })
            return res.send(usuarios)
        } else {
            return res.send([])
        }
    },

    //CADASTRO DO USUARIO VIA POST
    registrar: async (req, res) => {
        const { nome, email, senha, confirmar_senha } = req.body

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
        try {
            const retorno = await UsuarioDb.insertOne({ nome, email, senha })
            await retorno.save()
            return res.send("Cadastro efetuado com sucesso✅")

        } catch (error) {
            return res.send("Erro ao cadastrar" + error.message)
        }
    },

    //ACESSO A PLATAFORMA VIA LOGIN PASSANDO OS DADOS POR POST
    login: async (req, res) => {
        const { email, senha } = req.body

        var msgErro = "Alguns campos não estão preenchidos ou os dados não são coerentes, por favor verificar se todos os dados estão corretos e preenchidos"

        if (email === undefined || email === "") {
            return res.send(msgErro)
        }

        if (senha === undefined || senha === "") {
            return res.send(msgErro)
        }

        const retorno = await UsuarioDb.findOne({ email })

        if (retorno === null) {
            return res.send({ error: "Usuario e/ou senha invalida" })
        }

        if (retorno.senha != senha) {
            return res.send({ error: "Usuario e/ou senha invalida" })
        }

        return res.send({ token: "Ok" })
    },

    //ATUALIZAR CADASTRO DE USUARIO
    atualizarCadastro: async (req, res) => {
        const { nome, email, senha, confirmar_senha } = req.body

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

        const retorno = await UsuarioDb.findOneAndUpdate({ email }, { nome, senha }, { new: true })

        if (retorno === null) {
            var msg = "Algo deu errado, confirmar suas credenciais corretamente"
            return res.send(msg)
        }

        return res.send({ message: "Dados atualizados" })
    },

    //DELETAR USUARIO
    deletar: async (req, res) => {
        const { _id } = req.body

        if (_id == undefined || _id == "") {
            return res.send({ error: "Id do usuario não encontrada" })
        }

        const retorno = await UsuarioDb.deleteOne({ _id })

        if (retorno == null) {
            return res.send({ error: "Erro ao excluir" })
        }

        return res.send({ message: "usuario removido com sucesso" })
    }
}