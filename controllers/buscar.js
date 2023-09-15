const { request, response } = require('express');
const {ObjectId} = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const { SISTEMA_ERROR } = require('../errors/dic_errors');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'rol'
];

// buscar un usuario por su nombre, correo o id
const buscarUsuarios = async(termino = '', req=request, res=response) => {
    const { limite=4, desde=0 } = req.query;

    const esMongoID = ObjectId.isValid( termino ); // verifica que sea un id de mongo para buscarlo
    
    if ( esMongoID ) {
        const usuario = await Usuario.findById( termino );
        
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        })
    };

    const regex = new RegExp( termino, 'i' ); // expresion regular para filtrar usuarios

    const query = {
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    };

    const [total, usuario] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(desde)
            .limit(limite)
    ]);

    res.json({
        total,
        results: usuario
    });
}

// busca categorias por nombre
const buscarCategorias = async(termino = '', req=request, res=response) => {
    const { limite=4, desde=0 } = req.query;

    const esMongoID = ObjectId.isValid( termino ); // verifica que sea un id de mongo para buscarlo
    
    if ( esMongoID ) {
        const categorias = await Categoria.findById( termino )
            .populate('usuario', 'nombre');
        
        return res.json({
            results: ( categorias ) ? [ categorias ] : []
        })
    };

    const regex = new RegExp( termino, 'i' ); // expresion regular para filtrar categoriass

    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments( { nombre: regex }, query),
        Categoria.find( { nombre: regex }) // si le agregas la condicion del query te devuelve las categorias con nombre
            .skip(desde)
            .limit(limite)
            .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        results: categorias
    });
}

// busca productos por nombre
const buscarProductos = async(termino = '', req=request, res=response) => {
    const { limite=4, desde=0 } = req.query;

    const esMongoID = ObjectId.isValid( termino ); // verifica que sea un id de mongo
    
    // si es un id mongo lo busca
    if ( esMongoID ) {
        const productos = await Producto.findById( termino )
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
        
        return res.json({
            results: ( productos ) ? [ productos ] : []
        })
    };

    const regex = new RegExp( termino, 'i' ); // expresion regular para filtrar productos

    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments( { nombre: regex }, query ),
        Producto.find({ nombre: regex }, query)
            .skip(desde)
            .limit(limite)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        total,
        results: productos
    });
}


const buscar = async(req=request, res=response) => {
    const {coleccion, termino} = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `La coleccion ${coleccion} no existe.`
        });
    };

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios( termino, req, res );
        break;

        case 'categorias':
            buscarCategorias( termino, req, res )
        break;

        case 'productos':
            buscarProductos( termino, req, res )
        break;

        default:
            res.status(400).json({
                result: [] 
            });
    };    
};


module.exports = {
    buscar
}