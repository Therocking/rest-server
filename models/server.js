const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        // conectar a base de datos
        this.conectarDB();

        // middleswares
        this.middleswares();

        // rutas de la app
        this.routes();
    };

    async conectarDB() {
        await dbConnection();
    };

    middleswares() {

        //CORS
        this.app.use( cors() );

        // lectura y parseo del body
        this.app.use( express.json() );

        // directorio publico
        this.app.use( express.static('public'));
    }

    routes() {

        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    };

    listen() {

        this.app.listen(this.port, () => {
            console.log('local in port', this.port);
        });        
    };
};


module.exports = Server;