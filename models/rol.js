const { Schema, model } = require("mongoose");
const { ROL_INVALIDO } = require("../errors/dic_errors");

const rolSchema = Schema({
    rol: {
        type: String,
        required: [true, ROL_INVALIDO]
    }
});


module.exports = model('Rol', rolSchema);