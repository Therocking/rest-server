const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerCategorias, crearCategoria, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { validarToken, validarCampos, validarAdminRole } = require('../middlewares');
const { NOMBRE_REQUERIDO, ID_NO_ES_VALIDO_MONGO } = require('../errors/dic_errors');
const { existeCategoria } = require('../helpers/db-validators');


const router = Router();

// obtern categorias - publico
router.get('/', obtenerCategorias);

// obtener categoria por id - publico
router.get('/:id',[
    check('id', ID_NO_ES_VALIDO_MONGO).isMongoId(),
    validarCampos,
    check('id').custom(existeCategoria),
    validarCampos
],obtenerCategoria);

// crear categoria - privado
router.post('/',[
    validarToken,
    check('nombre', NOMBRE_REQUERIDO).not().isEmpty(),
    validarCampos
],crearCategoria);

// actualizar categoria por id - privado
router.put('/:id',[
    validarToken,
    check('id', ID_NO_ES_VALIDO_MONGO).isMongoId(),
    validarCampos,
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);

// borrar categoria por id - admin
router.delete('/:id',[
    validarToken,
    validarAdminRole,
    check('id', ID_NO_ES_VALIDO_MONGO).isMongoId(),
    validarCampos,
    check('id').custom(existeCategoria),
    validarCampos
],borrarCategoria);


module.exports = router;