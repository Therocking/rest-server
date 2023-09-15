const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // rutas
        this.path = {
            auth:       '/api/auth',
            buscar:       '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios:   '/api/usuarios',
        };

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

        this.app.use( this.path.auth,     require('../routes/auth')); // auth
        this.app.use( this.path.buscar,     require('../routes/buscar')); // auth
        this.app.use( this.path.categorias, require('../routes/categorias')); // categorias
        this.app.use( this.path.productos, require('../routes/productos')); // categorias
        this.app.use( this.path.usuarios, require('../routes/usuarios')); // usuarios
    };

    listen() {

        this.app.listen(this.port, () => {
            console.log('local in port', this.port);
        });        
    };
};


module.exports = Server;