const { request, response } = require("express");
const { Producto } = require("../models");


const obtenerProductos = async(req=request, res=response) => {
    try {
        const {limite=4, desde=0} = req.query;
        const query = { estado: true }
        
        const [total, producto] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .skip(desde)
                .limit(limite)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
        ]);

        res.json({
            total, 
            producto
        })
    } catch (error) {
        console.log(error);
    }
    
}

const obtenerProducto = async(req=request, res=response) => {
    try {
        const {id} = req.params;

        const producto = await Producto.findById(id)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');

        res.json(producto);
        
    } catch (error) {
        console.log(error);
    }
}

const crearProducto = async(req=request, res=response) => {
    
    const {estado, usuario, ...info} = req.body;
    console.log(info);
    
    info.nombre = info.nombre.toUpperCase()
    
    const productoDB = await Producto.findOne({ nombre: info.nombre });

    if ( productoDB ) {
        return res.json({
            msg: 'Un producto ya existe con ese nombre'
        });
    };

    const data = {
        ...info,
        // nombre: info.nombre,
        usuario: req.usuario._id,
    }

    const producto = new Producto( data );

    producto.save();
    
    res.status(201).json( producto );
}

const actualizarProducto = async(req=request, res=response) => {
    try {
        const {estado, usuario, ...info} = req.body;
        const {id} = req.params;

        if ( info.nombre ) {
            info.nombre = info.nombre.toUpperCase()
        }

        info.usuario = req.usuario._id;

        const producto = await Producto.findByIdAndUpdate(id, info, {new: true});

        res.json(producto);
        
    } catch (error) {
        console.log(error);
    }
}

const eliminarProducto = async(req=request, res=response) => {
    try {
        const {id} = req.params;

        const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

        res.json(producto);
        
    } catch (error) {
        
    }
}



module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
}