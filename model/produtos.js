const mongoose = require("./database")

const {Schema} = mongoose

const ProdutoTable = new Schema(
    {
        nome:{
            type:String,
            requeri: true
        },
        valor:{
            type: String,
            require: true
        },
        quantidade:{
            type: String,
            require: true
        },
        disponivel:{
            type: Boolean,
            require: true
        }
    }
)

const Produto = mongoose.model('cadastro_produto', ProdutoTable)
module.exports(Produto)