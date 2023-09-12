const jwt = require('jsonwebtoken');
const { TOKEN_NO_CREADO } = require('../errors/dic_errors');

const generarJWT = (uid) => {
    return new Promise( (resolve, reject) => {

        const payload = {uid};

        jwt.sign( payload, process.env.PUBLIC_OR_SECRET_KEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject(TOKEN_NO_CREADO);
            }else{
                resolve(token)
            };
        });
    });
};

module.exports = {
    generarJWT
};