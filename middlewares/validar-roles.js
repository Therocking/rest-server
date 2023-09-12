const { request, response } = require("express");
const { ID_NO_ES_ADMIN } = require("../errors/dic_errors");

const validarAdminRole = (req=request, res=response, next) => {
    const {rol} = req.usuario;
    
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'No se puede la request validar sin el token'
        });
    };

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: ID_NO_ES_ADMIN
        });
    };


    next();
};

const validarRoles = ( ...roles ) => {

    return ( req=request, res=response, next ) => {
        const { rol } = req.usuario;
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'No se puede la request validar sin el token'
            });
        };
    
        if ( !roles.includes(rol) ) {
            return res.status(401).json({
                msg: ID_NO_ES_ADMIN
            });
        };
    
    
        next();
    }
}

module.exports = { 
    validarAdminRole,
    validarRoles,
}