'use-strict'

//importar express
var express = require('express');

//cargar el Router
var api = express.Router();

//cargar el controlador
const controladorInmueble = require('../controllers/controllerInmueble');
const controllerDispositivo = require('../controllers/controllerDispositivo');


//cargar el middleware de autenticacion
var autenticacion = require('../services/authentication');

//cargar si se requiere el connect-multiparty

//cargar las rutas get
api.get('/get',controladorInmueble.obtenerInmueble);
api.get('/list',controladorInmueble.listarInmuebles);

//cargar las rutas post
api.post('/add',controladorInmueble.añadirInmueble);
api.post('/addDevice', controladorInmueble.addNuevoDispositivo);
api.post('/addTypeDevice', controladorInmueble.addTipoDispositivo);
api.post('/registerValue', controllerDispositivo.enviarDatos);
api.post('/addSensor', controllerDispositivo.añadirSensor);
//cargar las rutas put


//cargar las rutas delete



//exportar la ruta
module.exports = api;
