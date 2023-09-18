
const  validarCampos  = require('../middlewares/validar-campos');
const  validarToken  = require('../middlewares/validar-jwt');
const  validarRoles  = require('../middlewares/validar-roles');
const  validarUploadsFiles  = require('../middlewares/validar-uploadsFiles');

module.exports = {
    ...validarCampos,
    ...validarRoles,
    ...validarToken,
    ...validarUploadsFiles,
}