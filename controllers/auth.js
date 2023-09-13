const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { ERROR_AUTH, SISTEMA_ERROR, TOKEN_GOOGLE_VERIFY } = require('../errors/dic_errors');
const { generarJWT } = require('../helpers/generarJWT');
const { GoogleVerify } = require('../helpers/google-verify');

const login = async(req=request, res=response) => {

    try {
        
        const { password, correo } = req.body;

        // verificar que el correo existe
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

const loginGoogle = async(req=request, res=response) => {
    try {
        
        const {id_token} = req.body;
        
        const { nombre, img, correo } = await GoogleVerify( id_token );
        
        let usuario = await Usuario.findOne({ correo });

        // si el usuario no existe lo crea
        if ( !usuario ) {
            const data = {
                nombre,
                correo,
                password: 'pass',
                img,
                google: true
            }

            usuario = new Usuario( data );

            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync( data.password, salt )

            await usuario.save();
        };

        //
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador. Usuario bloqueado'
            });
        };


        // geneta el jwt
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: TOKEN_GOOGLE_VERIFY
        });
    };
};

module.exports = {
    login,
    loginGoogle,
}