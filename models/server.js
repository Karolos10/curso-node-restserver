const express = require('express');
const cors = require('cors')

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();

    }

    middlewares(){

        //Directorio publico
        this.app.use( express.static('public'));

        //cors
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use(express.json());
    }

    routes() {

        this.app.use(this.userPath, require('../routes/user'));

    }

    listen(){

        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en puerto', this.port );
        })

    }

}


module.exports = Server;