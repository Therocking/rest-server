const { Schema, model } = require("mongoose");
const { PASSWORD_REQUERIDO, CORREO_REQUERIDO, NOMBRE_REQUERIDO } = require("../errors/dic_errors");


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, NOMBRE_REQUERIDO],
    },
    correo: {
        type: String,
        required: [true, CORREO_REQUERIDO],
        unique: true
    },
    password: {
        type: String,
        required: [true, PASSWORD_REQUERIDO],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);