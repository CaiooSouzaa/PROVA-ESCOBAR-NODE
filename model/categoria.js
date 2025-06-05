const mongoose = require("./database")

const { Schema } = mongoose

const CategoriaTable = new Schema(
    {
        nome:{
            type: String,
            required: true
        },
        descricao:{
            type: String
        },
        ativo:{
            type: Boolean
        }
    }
)

const Categoria = mongoose.model('categoria', CategoriaTable)
module.exports = Categoria