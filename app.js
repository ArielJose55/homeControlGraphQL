'use-strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar las rutas
 var inmuebleRouter = require('./routers/inmuebleRouter');
 var residenteRouter = require('./routers/residenteRouter');
// var biencomunRoute = require('./vistas/bienComunRuta');

//cargar el body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    res.header('Allow', 'GET, POST, PUT, OPTIONS, DELETE');
    next();
});

// configurar las rutas
 app.use('/properties', inmuebleRouter);
 app.use('/resident', residenteRouter);
// app.use('/ph', biencomunRoute);



module.exports = app;
