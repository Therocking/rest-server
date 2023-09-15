const { Categoria, Usuario, Rol, Producto } = require('../models');

const { ROL_INVALIDO, CORREO_EN_USO, ID_NO_EXISTE, ID_NO_ES_ADMIN } = require('../errors/dic_errors');


const validarRol = async( rol = '' ) => {

    // validacion de rol
    const existeRol = await Rol.findOne({ rol });
    if( !existeRol ) throw new Error(`El rol ${rol}, ${ROL_INVALIDO}`);
};

const existeCorreo = async( correo = '' ) => {

    // validacion de correo
    const existeCorreo = await Usuario.findOne({ correo });
    if( existeCorreo ) throw new Error( CORREO_EN_USO );
};

const existeUsuarioPorId = async( id = '' ) => {

    // validacion del id
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ) throw new Error( ID_NO_EXISTE );

};
const existeCategoria = async( id = '' ) => {

    const categoria = await Categoria.findById(id);

    if ( !categoria ) throw new Error('La categoria no existe');

};

const existeProducto = async( id = '' ) => {

    const producto = await Producto.findById(id);

    if ( !producto ) throw new Error('El producto no existe');

};

const nombreDuplicado = async( nombre = '' ) => {

    const nombreDB = nombre.toUpperCase();

    const producto = await Producto.findOne({nombre: nombreDB});

    if ( producto ) throw new Error('Ya ahi un producto con ese nombre');

};

module.exports = {
    validarRol,
    existeCorreo,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    nombreDuplicado,
}