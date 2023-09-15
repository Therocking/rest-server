const { Router } = require('express');
const { check } = require('express-validator');

const { login, register, loginGoogle } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { CORREO_REQUERIDO, PASSWORD_REQUERIDO, TOKEN_GOOGLE } = require('../errors/dic_errors');

const router = Router();

router.post('/login',[
    check('correo', CORREO_REQUERIDO).isEmail(),
    validarCampos,
    check('password', PASSWORD_REQUERIDO).not().isEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('id_token', TOKEN_GOOGLE).not().isEmpty(),
    validarCampos
],loginGoogle);


module.exports = router;