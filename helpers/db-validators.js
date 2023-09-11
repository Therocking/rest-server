const Rol = require('../models/rol');
const Usuario = require('../models/usuario');
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

const esAdminId = async( id = '' ) => {

    // validar si el id del usuario tiene el rol de admin
    const usuarioAdmin = await Usuario.findById(id);
    if ( usuarioAdmin.rol !== 'ADMIN_ROLE' ) throw new Error(ID_NO_ES_ADMIN)

}

module.exports = {
    validarRol,
    existeCorreo,
    existeUsuarioPorId,
    esAdminId,
}