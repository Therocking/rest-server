const { Router } = require('express');
const { check } = require('express-validator');

const { validarToken, validarCampos, validarAdminRole } = require('../middlewares');
const { existeProducto, nombreDuplicado } = require('../helpers/db-validators');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { NOMBRE_REQUERIDO, ID_NO_ES_VALIDO_MONGO } = require('../errors/dic_errors');

const router = Router();

router.get('/', obtenerProductos)

router.get('/:id',[
    check('id', ID_NO_ES_VALIDO_MONGO).isMongoId(),
    validarCampos,
    check('id').custom( existeProducto ),
    validarCampos,
],obtenerProducto)

router.post('/',[
    validarToken,
    check('nombre', NOMBRE_REQUERIDO).not().isEmpty(),
    validarCampos,
    check('categoria', 'Espesifica la categoria').isMongoId(),
    validarCampos
],crearProducto)

router.put('/:id',[
    validarToken,
    check('id', ID_NO_ES_VALIDO_MONGO).isMongoId(),
    validarCampos,
    check('nombre').custom(nombreDuplicado),
    validarCampos,
    check('id').custom(existeProducto),
    validarCampos
],actualizarProducto)

router.delete('/:id',[
    validarToken,
    validarAdminRole,
    validarCampos,
    check('id', ID_NO_ES_VALIDO_MONGO).isMongoId(),
    validarCampos,
    check('id').custom(existeProducto),
    validarCampos
],eliminarProducto)

module.exports = router;