const { Router } = require('express');

const { validarCampos, validarToken, validarUploadsFiles } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImg, actualizarImagenCloudinary } = require('../controllers/uploads');
const { check } = require('express-validator');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { ID_NO_ES_VALIDO_MONGO } = require('../errors/dic_errors');

const router = Router();

router.post('/',[
    validarToken,
    validarUploadsFiles,
    validarCampos
],cargarArchivo);

router.put('/:coleccion/:id',[
    validarToken,
    validarUploadsFiles,
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] )),
    validarCampos,
    check('id', ID_NO_ES_VALIDO_MONGO).isMongoId(),
    validarCampos,
], actualizarImagenCloudinary)

router.get('/:coleccion/:id',[
    validarToken,
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] )),
    validarCampos,
    check('id', ID_NO_ES_VALIDO_MONGO).isMongoId(),
    validarCampos,
], mostrarImg) 

module.exports = router;