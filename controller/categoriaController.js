const CategoriaDb = require("../model/categoria")

module.exports = ({
    listarTodos: async (req, res) => {
        const categoria = await CategoriaDb.find()
        return res.status(201).send(categoria)
    },

    buscaNomeCategoria: async (req, res) => {
        const nome = req.params.nome || ""

        if (nome) {
            const categoria = await CategoriaDb.find({ nome: { $regex: nome, $options: "i" } })
            return res.status(201).send(categoria)
        } else {
            return res.status(400).send([])
        }
    },
    registrar: async (req, res) => {
        const { nome, descricao, ativo } = req.body
        var msg = "Alguns campos não estão preenchidos ou os dados não são coerentes, por favor verificar se todos os dados estão corretos e preenchidos"

        if (!nome) {
            return res.status(400).send(msg)
        }

        if (!descricao) {
            return res.status(400).send(msg)
        }

        if (!ativo) {
            return res.status(400).send(msg)
        }

        try {
            const retornoCategoria = await CategoriaDb.insertOne({ nome, descricao, ativo })
            await retornoCategoria.save()
            return res.status(201).send("Cadastro efetuado com sucesso✅" + retornoCategoria)
        } catch (error) {
            return res.status(400).send("Erro ao cadastrar" + error.message)
        }
    },

    atualizaCliente: async (req, res) => {
        const { nome, descricao, ativo } = req.body
        var msg = "Alguns campos não estão preenchidos ou os dados não são coerentes, por favor verificar se todos os dados estão corretos e preenchidos"

        if (!nome) {
            return res.status(400).send(msg)
        }

        if (!descricao) {
            return res.status(400).send(msg)
        }

        if (!ativo) {
            return res.status(400).send(msg)
        }

        try {
            const retornoCategoria = await CategoriaDb.findOneAndUpdate({ nome }, { descricao, ativo }, { new: true })
            return res.send({ message: "Dados atualizados" })
        } catch (error) {
            if (retornoCategoria == null) {
                var msg = "Algo deu errado, confirmar suas credenciais corretamente"
                return res.status(400).send(msg)
            }
        }
    },
    delete: async (req, res) => {
        const { _id } = req.body

        if (_id == undefined || _id == "") {
            return res.status(400).send({ error: "Id do usuario não encontrada" })
        }

        const retorno = await UsuarioDb.deleteOne({ _id })

        if (retorno == null) {
            return res.status(400).send({ error: "Erro ao excluir" })
        }

        return res.send({ message: "usuario removido com sucesso" })
    }
})