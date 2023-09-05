const { response, request } = require('express');

const usuariosGet = (req, res = response) => {

    res.json({
        msg: "get api"
    });
};

const usuariosPost = (req = request, res = response) => {
    const {name} = req.body;

    res.json({
        name
    });
};

const usuariosPut = (req, res = response) => {

    res.json({
        msg: "put api"
    });
};

const usuariosDel = (req, res = response) => {

    res.json({
        msg: "delete api"
    });
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDel,
    usuariosPut,
}