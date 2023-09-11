const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDel } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarRol, existeCorreo, existeUsuarioPorId, esAdminId } = require('../helpers/db-validators');
const { NOMBRE_REQUERIDO, PASSWORD_INVALIDO, CORREO_INVALIDO } = require('../errors/dic_errors');


const router = Router();

router.get('/:id',[
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('id').custom(esAdminId),
    validarCampos
], usuariosGet);

router.post('/',[ // middlewares - validacion
    check('nombre', NOMBRE_REQUERIDO).not().isEmpty(),
    check('password', PASSWORD_INVALIDO).isLength({ min: 6 }),
    check('correo', CORREO_INVALIDO).isEmail().custom( existeCorreo ),
    // check('rol', 'Rol invalido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( validarRol ),
    validarCampos

],usuariosPost);

router.put('/:id',[
    check('id', 'ID no valido').isMongoId().custom(existeUsuarioPorId),
    check('rol').custom( validarRol ),
    validarCampos
], usuariosPut);
        
router.delete('/:id',[
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDel);

module.exports = router;