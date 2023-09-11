
const dic_errors = {
    // ERRORES CORREO
    CORREO_INVALIDO: 'Correo Invalido',
    CORREO_REQUERIDO: 'El Correo Es Obligatorio',
    CORREO_EN_USO: 'Ese Correo Ya Esta En Uso',
    CORREO_INCORRECTO: 'Correo Incorrecto',
    //ERRORES PASSWORD
    PASSWORD_INVALIDO: 'El Password Debe Tener Mas De 6 Caracteres',
    PASSWORD_REQUERIDO: 'El Password Es Obligatorio',
    PASSWORD_INCORRECTO: 'El Password Es Incorrecto',
    //ERRORES NOMBRE
    NOMBRE_REQUERIDO: 'El Nombre Es Obligatorio',
    // ERRRORES ROL
    ROL_INVALIDO: 'No Es Un Rol Valido',
    ROL_REQUERIDO: 'El Rol Es Obligatorio',
    // ERRRORES ID
    ID_NO_EXISTE: 'No existe un usuario con ese ID',
    ID_NO_ES_ADMIN: 'El ID no tiene previlegios de administrador para realizar esa accion',
}

module.exports = { ...dic_errors };