const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        // conectar la base de datos
        await mongoose.connect(process.env.CNN_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true, useFindAndModify: false, /* are not supoted */
        });

        console.log('Base de datos conectada');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar base de datos.\n Error en database/config.js');
    };
};

module.exports = {
    dbConnection
}