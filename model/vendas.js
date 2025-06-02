const mongoose = require("./database")

const {Schema} = mongoose

const VendasTable = new Schema(
    {
        nome_produto:{
            type: String,
            require: true
        },
        data_venda:{
            type: Date,
            default: Date.now
        },
        valor_venda:{
            type: String,
            require: true
        }
    }
)

const Vendas = mongoose.model('vendas_produto', VendasTable)
module.export(Vendas)