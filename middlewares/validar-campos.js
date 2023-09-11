const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {

    // mapped muestra directamente donde esta el error y el mensaje

    const errrors = validationResult(req);
    if ( !errrors.isEmpty() ) return res.status(400).json( errrors/* .mapped() */ );

    next()
};

module.exports = {
    validarCampos,
}