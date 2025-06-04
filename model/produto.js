const mongoose = require("./database")

const {Schema} = mongoose

const ProdutoTable = new Schema(
    {
        codigo:{
            type: String,
            required: true
        },
        nome:{
            type:String,
            requered: true
        },
        valor:{
            type: String,
            required: true
        },
        quantidade:{
            type: String,
            required: true
        },
        categoria:{
            type: String
        },
        disponivel:{
            type: Boolean,
            required: true
        },
        descricao:{
            type: String
        }
    }
)

const Produto = mongoose.model('produto', ProdutoTable)
module.exports = Produto