const mongoose = require("./database")

const { Schema } = mongoose

const UserTable = new Schema(
    {
        nome: {
            type: String,
            require: true,
            unique: true
        },
        email: {
            type: String,
            require: true
        },
        senha: {
            type: String,
            require: true
        },
        confirmar_senha: {
            type: String,
            require: true
        },
        data_criacao: {
            type: Date,
            default: Date.now
        }
    }
)

const Usuario = mongoose.model('login_usuario', UserTable)
module.exports = Usuario