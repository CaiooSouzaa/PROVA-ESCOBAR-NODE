const VendaDb = require("../model/vendas")

module.exports = {
    //BUSCA DE TODOS OS USUARIOS
    listarTodos: async (req, res) => {
        const vendas = await VendaDb.find()
        return res.send(vendas)
    },

    //BUCAS PERSONALIZADA DE VENDAS PASSANDO O CODIGO VIA GET
    buscarPeloCodigo: async (req, res) => {
        const codigo = req.params.codigo || ""

        if (codigo) {
            const codigoVenda = await VendaDb.find({ codigo: { $regex: codigo, $options: "i" } })
            return res.send(codigoVenda)
        } else {
            return res.send([])
        }
    },

    //CADASTRO DE VENDA VIA POST
    registrar: async (req, res) => {
        try {
            const { codigo_venda, cliente, produto, valor_total } = req.body

            var msg = "Alguns campos não estão preenchidos ou os dados não são coerentes, por favor verificar se todos os dados estão corretos e preenchidos"

            if (!codigo_venda) {
                return res.status(400).send(msg)
            }

            if (!cliente) {
                return res.status(400).send(msg)
            }

            if (produto.some(produto => produto.codigo == "" || produto.codigo == undefined)) {
                return res.send({ mensagem: "O codigo do produto não pode ser nulo." })
            }
            if (produto.some(produto => produto.quantidade == "" || produto.quantidade == undefined)) {
                return res.send({ mensagem: "A quantidade do produto não pode ser nulo." })
            }
            if (produto.some(produto => produto.preco == "" || produto.preco == undefined)) {
                return res.send({ mensagem: "O preco do produto não pode ser nulo." })
            }

            if (!valor_total) {
                return res.status(400).send(msg)
            }
            const retornoVenda = await VendaDb.create({ codigo_venda, cliente, produto, valor_total })
            await retornoVenda.save()
            return res.send("Cadastro efetuado com sucesso✅")
        } catch (error) {
            return res.status(201).send("Erro ao cadastrar" + error.massage)
        }

    },
    atualizarVenda: async (req, res) => {
        try {
            const { codigo_venda, cliente, produto, valor_total } = req.body

            var msg = "Preencha todos os capos"


            if (!codigo_venda) {
                return res.status(400).send(msg)
            }

            if (!cliente) {
                return res.status(400).send(msg)
            }

            if (!produto) {
                return res.status(400).send(msg)
            }

            if (!valor_total) {
                return res.status(400).send(msg)
            }
            const retornoAtualizaVenda = await VendaDb.findOneAndUpdate({ codigo_venda }, { cliente, produto, valor_total }, { new: true })

            if (retornoAtualizaVenda == null) {
                var msg = "Algo deu errado, confirmar suas credenciais corretamente"
                return res.send(msg)
            }

        } catch (error) {
            return res.send("Erro na atualização" + error.message)
        }

        return res.send({ message: "Dados atualizados" })
    },

    deletar: async (req, res) => {
        const { _id, codigo_venda } = req.body

        if (!_id) {
            return res.send({ erros: "Id do produto não encontrado" })
        }

        if (!codigo_venda) {
            return res.send({ error: "Codigo do produto não encontrado" })
        }

        try {
            const retornoDeletarVenda = await VendaDb.deleteOne({ _id, codigo_venda })

            if (retornoDeletarVenda == null) {
                return res.send({ error: "Erro ao excluir" })
            }
        } catch (error) {
            return res.send("Erro na atualização" + error.message)
        }

        return res.send({ message: "Produto deletado com sucesso" })
    }
}