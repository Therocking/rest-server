const { request, response } = require("express");

const {Categoria} = require('../models');
const { NOMBRE_REQUERIDO } = require("../errors/dic_errors");

const obtenerCategorias = async(req=request, res=response) => {
    try {
        
        const { limite=4, desde=0 } = req.query;
        const query = { estado: true }
    
        const [total,categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('usuario', 'nombre')
                .skip(desde)
                .limit(limite)
        ])
    
        res.json({
            total,
            categorias
        });
    } catch (error) {
        console.log(error);
    }
};

const obtenerCategoria = async(req=request, res=response) => {
    try {
        
        const { id } = req.params;
        
        const categoria = await Categoria.findById( id )
        .populate('usuario', 'nombre')
    
        res.json({
            categoria
        });
    } catch (error) {
        console.log(error);
    }
}

const crearCategoria = async(req=request, res=response) => {
    try {
        
        const nombre = req.body.nombre.toUpperCase();
    
        const categoriaDB = await Categoria.findOne({ nombre });
    
        if ( categoriaDB ) {
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre}, ya existe`
            });
        };
    
        // data a guardar en DB
        const data = {
            nombre,
            usuario: req.usuario._id
        };
    
        const categoria = new Categoria( data );
    
        // guardar categoria en DB
        await categoria.save();
    
        res.status(201).json({
            categoria
        });
    } catch (error) {
        console.log(error);
    }
};

const actualizarCategoria = async(req=request, res=response) => {
    try {
        
        const nombre = req.body.nombre.toUpperCase();
        const {id} = req.params;
    
        if ( !nombre ) {
            return res.status(400).json({
                msg: NOMBRE_REQUERIDO
            });
        };

        
        
        const categoria = await Categoria.findByIdAndUpdate(id, {nombre: nombre}, {new: true});     
        
        res.json({
            categoria,
        })
    } catch (error) {
        console.log(error);
    }
}

const borrarCategoria = async(req=request, res=response) => {
    try {
        
        const {id} = req.params;
    
        const categoria = await Categoria.findByIdAndUpdate( id, {estado: false}, {new: true} );
    
        res.json(categoria);
    } catch (error) {
        console.log(error);
    }
} 

module.exports = {
    obtenerCategorias,
    crearCategoria,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
}