
const dic_errors = {
    // ERRORES AUTENTICACION
    USUARIO_INEXISTENTE: 'Usuario No Existe',
    ERROR_AUTH: 'correo / password no son correctos',
    // ERRORES CORREO
    CORREO_INVALIDO: 'El Correo No Es Valido',
    CORREO_REQUERIDO: 'El Correo Es Obligatorio',
    CORREO_EN_USO: 'Ese Correo Ya Esta En Uso',
    //ERRORES PASSWORD
    PASSWORD_INVALIDO: 'El Password Debe Tener Mas De 6 Caracteres',
    PASSWORD_REQUERIDO: 'El Password Es Obligatorio',
    PASSWORD_INCORRECTO: 'El Password Es Incorrecto',
    //ERRORES NOMBRE
    NOMBRE_REQUERIDO: 'El Nombre Es Obligatorio',
    NOMBRE_EN_USO: 'El Nombre Ya Esta En Uso',
    // ERRRORES ROL
    ROL_INVALIDO: 'No Es Un Rol Valido',
    ROL_REQUERIDO: 'El Rol Es Obligatorio',
    // ERRRORES ID
    ID_NO_EXISTE: 'No existe un usuario con ese ID',
    ID_NO_ES_ADMIN: 'El ID no tiene previlegios de administrador para realizar esa accion',
    ID_NO_ES_VALIDO: 'El ID No Es Valido',
    ID_NO_ES_VALIDO_MONGO: 'El ID No Es Un ID Valido De Mongo',
    // ERRORES TOKEN
    TOKEN_EN_PETICION: 'No Hay Token En La Peticion',
    TOKEN_INVALIDO: 'Token No Valido',
    TOKEN_NO_CREADO: 'No Se Pudo Crear El Token',
    TOKEN_EXPIRADO: 'El Token Ha Expirado',
    TOKEN_GOOGLE: 'El Id_Token De Google Es Necesario',
    TOKEN_GOOGLE_VERIFY: 'El Token No Pudo Ser Verificado',
    // ERRORES SISTEMA
    SISTEMA_ERROR: 'algo salio mal. Hable con el administrador.',
}

module.exports = { ...dic_errors };