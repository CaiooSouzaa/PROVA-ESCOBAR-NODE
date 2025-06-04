const mongoose = require("./database")

const {Schema} = mongoose

const VendasTable = new Schema(
    {
        data_venda:{
            type: Date,
            default: Date.now
        },
        numeroNotaFiscal:{
            type: Number,
            required: true
        },
        cliente:{
            cpf:{
                type: String,
                required: true
            },
            nome:{
                type: String,
                required: true
            },
            email:{
                type: String
            },
            enderecoCliente:{
                type: String,
                required: true
            },
            telefone:{
                celular:{
                    type:String,
                    required: true
                }
            }
        },

        produto:[
            {
                codigo:{
                    type: String,
                    required: true
                },
                nome:{
                    type: String,
                },
                categoria:{
                    type: String,
                },
                quantidade:{
                    type: String,
                    required: true
                },
                preco:{
                    type: String,
                    required: true
                }
            }
        ],
        valor_total:{
            type: Number,
            required: true
        }
    }
)

const Vendas = mongoose.model('vendas', VendasTable)
module.export(Vendas)