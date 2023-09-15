const { Schema, model } = require("mongoose");
const { NOMBRE_REQUERIDO } = require("../errors/dic_errors");

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        require: [true, NOMBRE_REQUERIDO],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
});

CategoriaSchema.methods.toJSON = function () {
    const { __v, estado, ...categoria} = this.toObject();
    return categoria;
}


module.exports = model('Categoria', CategoriaSchema);