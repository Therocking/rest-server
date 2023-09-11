const { response, request } = require('express');
const bcrypt = require('bcryptjs');
require('colors');

const Usuario = require('../models/usuario');


const usuariosGet = async(req, res = response) => {
    const { limite = 4, desde = 0 } = req.query;
    const query = { estado: true } // regresa solo los usuarios activos(estado: true).
    
    // promesas se cumplen al mismo tiempo - no se bloquean.
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip( desde )
        .limit( limite )
    ]);

    res.json({
        total, 
        usuarios
    });
};

const usuariosPost = async(req = request, res = response) => {

    const {nombre, password, correo, rol} = req.body;
    const usuario = new Usuario({ nombre, password, correo, rol });

    // hash del password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    // guardar en db
    await usuario.save();

    res.status(201).json(usuario);
    
};

const usuariosPut = async(req, res = response) => {
        
    const { id } = req.params;
    const { _id, password, google, correo, rol, ...resto } = req.body;

    // validar contra la db
    if (password) {
        
        // hash del password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json(usuario);
   
};

const usuariosDel = async(req, res = response) => {
    const { id } = req.params;

    // borra el usuario fisicamente - no recomendado
    // const usuarioDel = await Usuario.findByIdAndDelete(id);

    // mantiene la referencia de usuario - recomendado 
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );

    res.json(usuario);
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDel,
    usuariosPut,
}