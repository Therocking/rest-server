const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDel } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', usuariosPost);

router.put('/', usuariosPut);
        
router.delete('/', usuariosDel);

module.exports = router;