const VendasDb = require("../model/vendas")

module.exports = {
    //BUSCA DE TODOS OS USUARIOS
    listarTodos: async (req, res) =>{
        const vendas = await VendasDb.find()
        return res.send(vendas)
    },

    //BUCAS PERSONALIZADA DE VENDAS PASSANDO O CODIGO VIA GET
    buscarPeloCodigo: async (req, res) =>{
        const codigo = req.params.codigo || ""

        if(codigo){
            const codigoVenda = await VendasDb.find({codigo:{$regex: codigo, $options: "i"}})
            return res.send(codigoVenda)
        }else{
            return res.send([])
        }
    },

    //CADASTRO DE VENDA VIA POST
    registrar: async (req, res) =>{
        const {}
    }
}