const { Categoria, Usuario, Rol, Producto } = require('../models');

const { ROL_INVALIDO, CORREO_EN_USO, ID_NO_EXISTE, ID_NO_ES_ADMIN, NOMBRE_EN_USO } = require('../errors/dic_errors');

/*
** valida que el rol este permitido
*/
const validarRol = async( rol = '' ) => {

    // validacion de rol
    const existeRol = await Rol.findOne({ rol });
    if( !existeRol ) throw new Error(`El rol ${rol}, ${ROL_INVALIDO}`);
};

/*
** valida que no hayan dos usuarios con el mismo correo
*/
const existeCorreo = async( correo = '' ) => {

    // validacion de correo
    const existeCorreo = await Usuario.findOne({ correo });
    if( existeCorreo ) throw new Error( CORREO_EN_USO );
};

/*
** valida valida que un usuario exista en la coleccion
*/
const existeUsuarioPorId = async( id = '' ) => {

    // validacion del id
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ) throw new Error( ID_NO_EXISTE );

};

/*
** valida que una categoria exista en la coleccion
*/
const existeCategoria = async( id = '' ) => {

    const categoria = await Categoria.findById(id);

    if ( !categoria ) throw new Error('La categoria no existe');

};

/*
** valida que un producto exista en la coleccion
*/
const existeProducto = async( id = '' ) => {

    const producto = await Producto.findById(id);

    if ( !producto ) throw new Error('El producto no existe');

};

/*
** valida que no hayan dos productos con el mismo nombre
*/
const nombreDuplicado = async( nombre = '' ) => {

    const nombreDB = nombre.toUpperCase();

    const producto = await Producto.findOne({nombre: nombreDB});

    if ( producto ) throw new Error(NOMBRE_EN_USO);

};


/*
** valida coleciones permitidas en upload
*/
const coleccionesPermitidas = ( coleccion, colecciones = [] ) => {

    if ( !colecciones.includes(coleccion) ) {
        throw new Error(`La coleccion ${coleccion}, no existe`)
    }
    return true;
}

module.exports = {
    validarRol,
    existeCorreo,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    nombreDuplicado,
    coleccionesPermitidas,
}