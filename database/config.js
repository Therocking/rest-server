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
    };
};

module.exports = {
    dbConnection
}