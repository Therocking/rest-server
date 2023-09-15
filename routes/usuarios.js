const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDel } = require('../controllers/usuarios');
const { validarRol, existeCorreo, existeUsuarioPorId } = require('../helpers/db-validators');


const { validarToken, validarCampos, validarRoles } = require('../middlewares');
const { NOMBRE_REQUERIDO, PASSWORD_INVALIDO, CORREO_INVALIDO } = require('../errors/dic_errors');

const router = Router();

router.get('/:id',[
    validarToken,
    validarRoles('ADMIN_ROLE', 'VENTAS_ROLE'),
    validarCampos,
    check('id', 'ID no valido').isMongoId(),
    validarCampos,
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosGet);

router.post('/',[ // middlewares - validacion
    check('nombre', NOMBRE_REQUERIDO).not().isEmpty(),
    validarCampos,
    check('password', PASSWORD_INVALIDO).isLength({ min: 6 }),
    validarCampos,
    check('correo', CORREO_INVALIDO).isEmail().custom( existeCorreo ),
    validarCampos,
    check('correo').custom( existeCorreo ),
    validarCampos,
    check('correo').custom( existeCorreo ),
    validarCampos,
    // check('rol', 'Rol invalido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( validarRol ),
    validarCampos

],usuariosPost);

router.put('/:id',[
    validarToken,
    check('id', 'ID no valido').isMongoId(),
    validarCampos,
    check('rol').custom(existeUsuarioPorId),
    validarCampos,
    check('rol').custom( validarRol ),
    validarCampos
], usuariosPut);
        
router.delete('/:id',[
    validarToken,
    validarRoles('ADMIN_ROLE', 'VENTAS_ROLE'),
    validarCampos,
    check('id', 'ID no valido').isMongoId(),
    validarCampos,
    check('id').custom(existeUsuarioPorId),
    validarCampos,
], usuariosDel);

module.exports = router;