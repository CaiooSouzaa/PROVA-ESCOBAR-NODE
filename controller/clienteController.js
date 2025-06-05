const ClienteDb = require("../model/cliente")

module.exports = {
    //BUSCA DE TODOS OS USUARIOS
    listatarTodos: async (req, res) => {
        const usuario = await ClienteDb.find()
        return res.send(usuario)
    },

    //BUSCA PERSONALIZADA PELO USUARIO PASSANDO O NOME VIA GET
    buscarPeloNome: async (req, res) => {
        const nome = req.params.nome || ""

        if (nome) {
            const cliente = await ClienteDb.find({ nome: { $regex: nome, $options: "i" } })
            return res.send(cliente)
        } else {
            return res.send([])
        }
    },

    //CADASTRO DO USUARIO VIA POST
    registrarCliente: async (req, res) => {
        try {
            const { nome, cpf, endereco, telefone, email } = req.body

            if (
                !nome) {
                return res.send({ mensagem: "O nome não pode ser nulo." })
            }
            if (!cpf) {
                return res.send({ mensagem: "O cpf não pode ser nulo." })
            }
            var cliente = await ClienteDb.insertOne({ nome, cpf, endereco, telefone, email })

            return res.send(cliente)
        }
        catch (e) {
            console.log(e)
        }
    },

    //ATUALIZAR CADASTRO DE USUARIO
    atualizarCliente: async (req, res) => {
        const { nome, cpf, endereco, telefone, email } = req.body

        var msg = "Alguns campos não estão preenchidos ou os dados não são coerentes, por favor verificar se todos os dados estão corretos e preenchidos"

        if (nome === undefined || nome === "") {
            return res.status(400).send(msg)
        }

        if (cpf === undefined || cpf === "") {
            return res.status(400).send(msg)
        }

        if (endereco === undefined || endereco === "") {
            return res.status(400).send(msg)
        }

        if (telefone === undefined || telefone === "") {
            return res.status(400).send(msg)
        }

        if (email === undefined || email === "") {
            return res.status(400).send(msg)
        }

        const retornoCliente = await ClienteDb.findOneAndUpdate({ nome }, { cpf, endereco, telefone, email }, { new: true })

        if (retornoCliente === null) {
            var msg = "Algo deu errado, confirmar suas credenciais corretamente"
            return res.status(400).send(msg)
        }

        return res.send({ message: "Dados atualizados" })
    },

    //DELETAR USUARIO
    deletar: async (req, res) => {
        const { _id, cpf } = req.body

        if (_id == undefined || _id == "") {
            return res.status(400).send({ error: "Id do usuario não encontrada" })
        }

        if (cpf == undefined || cpf == "") {
            return res.status(400).send({ error: "Id do usuario não encontrada" })
        }


        const retornoCliente = await ClienteDb.deleteOne({ _id, cpf })

        if (retornoCliente == null) {
            return res.status(400).send({ error: "Erro ao excluir" })
        }

        return res.send({ message: "usuario removido com sucesso" })
    }
}