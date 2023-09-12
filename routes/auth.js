const { Router } = require('express');
const { check } = require('express-validator');

const { login, register } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { CORREO_REQUERIDO, PASSWORD_REQUERIDO } = require('../errors/dic_errors');

const router = Router();

router.post('/login',[
    check('correo', CORREO_REQUERIDO).isEmail(),
    check('password', PASSWORD_REQUERIDO).not().isEmpty(),
    validarCampos
],login);

router.post('/register',register)



module.exports = router;