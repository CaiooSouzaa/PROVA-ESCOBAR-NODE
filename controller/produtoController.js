const ProdutoDb = require("../model/produto")

module.exports = {
    listarTodos: async (req, res) => {
        const produto = await ProdutoDb.find()
        return res.send(produto)
    },

    buscarProduto: async (req, res) => {
        const codigoProduto = req.params.codigo || ""

        if (codigoProduto) {
            const produto = await ProdutoDb.find({ codigo, nome, valor, quantidade, categoria, disponivel, descricao })

            return res.send(produto)
        } else {
            return res.send([])
        }
    },

    registrarProduto: async (req, res) => {
        const { codigo, nome, valor, quantidade, categoria, disponivel, descricao } = req.body

        var msg = "Preencha todos os capos"

        if (!codigo) {
            return res.status(400).send(msg)
        }

        if (!nome) {
            return res.status(400).send(msg)
        }

        if (!valor) {
            return res.status(400).send(msg)
        }

        if (!quantidade) {
            return res.status(400).send(msg)
        }

        if (!categoria) {
            return res.status(400).send(msg)
        }

        if (!disponivel) {
            return res.status(400).send(msg)
        }

        try {
            const retornoProduto = await ProdutoDb.insertOne({ codigo, nome, valor, quantidade, categoria, disponivel, descricao })
            await retornoProduto.save()
            return res.send("Cadastro efetuado com sucesso✅")
        } catch (error) {
            return res.send("Erro ao cadastrar" + error.message)
        }
    },

    atualizarProduto: async (req, res) => {
        const { codigo, nome, valor, quantidade, categoria, disponivel, descricao } = req.body

        var msg = "Preencha todos os capos"


        if (!codigo) {
            return res.status(400).send(msg)
        }

        if (!nome) {
            return res.status(400).send(msg)
        }

        if (!valor) {
            return res.status(400).send(msg)
        }

        if (!quantidade) {
            return res.status(400).send(msg)
        }

        if (!categoria) {
            return res.status(400).send(msg)
        }

        if (disponivel === undefined || disponivel === null) {
            return res.status(400).send(msg)
        }

        try {
            const retornoAtualizaProduto = await ProdutoDb.findOneAndUpdate({ codigo }, { nome, valor, quantidade, categoria, disponivel, descricao }, { new: true })

            if (retornoAtualizaProduto == null) {
                var msg = "Algo deu errado, confirmar suas credenciais corretamente"
                return res.send(msg)
            }
        } catch (error) {
            return res.send("Erro na atualização" + error.message)
        }

        return res.send({ message: "Dados atualizados" })
    },

    deletar: async (req, res) => {
        const { _id, codigo } = req.body

        if (!_id) {
            return res.send({ erros: "Id do produto não encontrado" })
        }

        if (!codigo) {
            return res.send({ error: "Codigo do produto não encontrado" })
        }

        try {
            const retornoDeletarProduto = await ProdutoDb.deleteOne({ _id, codigo })

            if (retornoDeletarProduto == null) {
                return res.send({ error: "Erro ao excluir" })
            }
        } catch (error) {
            return res.send("Erro na atualização" + error.message)
        }

        return res.send({ message: "Produto deletado com sucesso" })
    }
}