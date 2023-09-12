const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');
const { TOKEN_EN_PETICION, TOKEN_INVALIDO, TOKEN_EXPIRADO, USUARIO_INEXISTENTE } = require('../errors/dic_errors');

const validarToken = async(req=request, res=response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: TOKEN_EN_PETICION
        });
    };

    try {
        
        const {uid} = jwt.verify(token, process.env.PUBLIC_OR_SECRET_KEY,);

        const usuario = await Usuario.findById(uid);; // crea una nueva propieda en el obj req

        req.usuario = usuario;

        if ( !usuario ) {
            return res.status(401).json({
                msg: USUARIO_INEXISTENTE
            });
        };

        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: TOKEN_INVALIDO
            });
        };
        
        next();
    } catch (error) {
        console.log(error);
       
        if (error.message === 'jwt expired') {
            return res.status(401).json({
                msg: TOKEN_EXPIRADO
            });    
        }

        res.status(401).json({
            msg: TOKEN_INVALIDO
        });
    };
};


module.exports = {
    validarToken,
};