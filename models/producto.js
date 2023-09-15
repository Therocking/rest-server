const { Schema, model } = require("mongoose");
const { NOMBRE_REQUERIDO } = require("../errors/dic_errors");

const ProductoSchema = Schema({
    nombre: {
        type: String,
        require: [true, NOMBRE_REQUERIDO],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        require: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true,
    },
    descriocion: { type: String },
    disponible: { type: Boolean, default: true }
});

ProductoSchema.methods.toJSON = function () {
    const { __v, estado, ...categoria} = this.toObject();
    return categoria;
}


module.exports = model('Producto', ProductoSchema);