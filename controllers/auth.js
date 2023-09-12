const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { ERROR_AUTH, SISTEMA_ERROR } = require('../errors/dic_errors');
const { generarJWT } = require('../helpers/generarJWT');

const login = async(req=request, res=response) => {

    try {
        
        const { password, correo } = req.body;

        // verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        
        if( !usuario ) {
            return res.status(400).json({
                msg: ERROR_AUTH 
            });
        };

        // verificar el usuario este activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: ERROR_AUTH
            });
        };

        // validar el password
        const validPassword = bcrypt.compareSync( password, usuario.password);
        if ( !validPassword ) {
            return res.status(400).json({
                msg: ERROR_AUTH
            });
        };

        // generar JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SISTEMA_ERROR 
        })   
    }
};

const register = (req=request, res=response) => {
    const {} = req.body;

    

    res.json({
        msg: 'register'
    })
}

module.exports = {
    login,
    register,
}