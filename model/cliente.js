const mongoose = require("./database")

const { Schema } = mongoose

const ClienteTable = new Schema(
    {
        nome: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        endereco: {
            cep: {
                type: String
            },
            numero_casa: {
                type: Number
            },
            bairro: {
                type: String
            },
            cidade: {
                type: String
            },
            estado: {
                type: String
            }
        },

        telefone: {
            type: String,
            required: true
        },

        email: {
            type: String
        }
    }
)

const Cliente = mongoose.model('cliente', ClienteTable)
module.exports = Cliente