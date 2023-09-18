const path = require('path');
const fs = require('fs');

const { request, response } = require('express');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { subirArchivo } = require('../helpers/subir-archivo');
const { Usuario, Producto } = require('../models');
const { ID_NO_EXISTE } = require('../errors/dic_errors');

const cargarArchivo = async(req=request, res=response) => {
    try {
        
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        
        res.json({
            nombre
        });

    } catch (msg) {
        res.status(400).json({ msg })
    }

};

// fn ejemplo
const actualizarImagen = async(req=request, res=response) => {
    
    const {coleccion, id} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.json({
                    msg: ID_NO_EXISTE
                });
            };
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.json({
                    msg: 'No existe producto con ese ID'
                });
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'ERROR en controllers/uploads' });
    }

    // limpiar imagenes previas
    if ( modelo.img ) {
        // path de la imagen a borrar
        const pathImg = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImg ) ) {
            fs.unlinkSync( pathImg )
        };
    };

    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    modelo.save();
    
    res.json( modelo )
    
}

const actualizarImagenCloudinary = async(req=request, res=response) => {
    
    const {coleccion, id} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.json({
                    msg: ID_NO_EXISTE
                });
            };
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.json({
                    msg: 'No existe producto con ese ID'
                });
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'ERROR en controllers/uploads' });
    }

    // limpiar imagenes previas
    if ( modelo.img ) {
        const nombreArr = modelo.img.split('/');
        const nombre    = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        await cloudinary.uploader.destroy( public_id );
    };

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    modelo.img = secure_url;

    modelo.save();
    
    res.json( modelo )
    
}

const mostrarImg = async(req=request, res=response) => {
    const {coleccion, id} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.json({
                    msg: ID_NO_EXISTE
                });
            };
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.json({
                    msg: 'No existe producto con ese ID'
                });
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'ERROR en controllers/uploads' });
    }
7
    // limpiar imagenes previas
    if ( modelo.img ) {
        // path de la imagen a borrar
        const pathImg = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImg ) ) {
            return res.sendFile( pathImg );
        };
    };
    
    const pathImg = path.join( __dirname, '../assets/no-image.jpg' );
    res.sendFile( pathImg )
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImg,
    actualizarImagenCloudinary,
}