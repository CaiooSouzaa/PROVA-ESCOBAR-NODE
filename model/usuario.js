const mongoose = require("./database")

const { Schema } = mongoose

const UserTable = new Schema(
    {
        nome: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        senha: {
            type: String,
            required: true
        },
        data_criacao: {
            type: Date,
            default: Date.now
        }
    }
)

const Usuario = mongoose.model('login_usuario', UserTable)
module.exports = Usuario