
const  validarCampos  = require('../middlewares/validar-campos');
const  validarToken  = require('../middlewares/validar-jwt');
const  validarRoles  = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarRoles,
    ...validarToken,
}