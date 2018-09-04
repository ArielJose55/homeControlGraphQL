'use-strict'

const controllerResidente = require('../controllers/controllerResidente');
const auth = require('../services/authentication');

const connectMultiparty = require('connect-multiparty');

const api = require('express').Router();

const upload = connectMultiparty({uploadDir: './resources/imagenes/perfil'});

api.get('/getInmueble',auth.authenticationUser, controllerResidente.obtenerInmuble);
api.get('/getImage/:image', controllerResidente.obtenerImagen);

api.post('/login', controllerResidente.verificarPropietario);
api.post('/savePropietario', controllerResidente.guardarPropietario);
api.post('/saveResidente', controllerResidente.guardarResidente);
api.post('/addimegen/:id', [auth.authenticationUser, upload], controllerResidente.subirImagen);

module.exports = api;