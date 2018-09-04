'use-strict'

//cargar el modelo de inmueble
const Inmueble = require('../models').Inmueble;
const Dispositivo = require('../models').Dispositivo;
const Tipo = require('../models').Tipo;

//cargar el mecanismo de encriptacion de claves
const bcrypt = require('bcrypt-nodejs');


function añadirInmueble(req, res) {

    const params = req.body;

    let inmuebleIn = {
        ubicacion: params.ubicacion,
        estrato: params.estrato
    };

    Inmueble.create(inmuebleIn).
    then((inmueble) => {
        if (inmueble) {
            res.status(200).send({
                inmueble: inmueble
            });
        }
    }).catch((err) => {
        res.status(400).send({
            error: err
        });
    });
}

function addTipoDispositivo(req, res) {
    const params = req.body;

    let tipoIn = {
        tipo: params.tipo,
        descripcion: params.descripcion
    };

    Tipo.create(tipoIn).then((tipo) => {
        if (tipo) {
            res.status(200).send({
                tipo: tipo
            });
        } else {

        }
    }).catch((err) => {
        res.status(400).send({
            error: err
        });
    });
}

function addNuevoDispositivo(req, res) {
    const params = req.body;
    let deviceIn = {
        numeroSerial: params.numero_serial,
        estado: params.estado,
        ubicacion: params.ubicacion,
        // fechaDeFuncionamiento: params.fecha_de_funcionamiento,
        id_tipo_fk: params.id_tipo,
        id_inmueble_fk: params.id_inmueble
    };

    Dispositivo.create(deviceIn).then((dispositivo) => {
        if (dispositivo) {
            res.status(200).send({
                dispositivo: dispositivo
            });
        } else {

        }
    }).catch((err) => {
        res.status(400).send({
            error: err
        });
    });

}


function obtenerInmueble(req, res) {

    var id_inmueble = req.params.id;

    if (id_inmueble != null) {

    } else {

    }

    res.status(200).send({
        mesage: 'estado recibida'
    });
}

function listarInmuebles(req, res) {
    Inmueble.findAll().then(project => {
        res.status(200).send({
            projects: project
        });
    });
}

function editarInmueble(req, res) {
    res.status(200).send({
        mesage: 'dispositivo actualizado?'
    });
}

function eliminarInmueble(req, res) {
    res.status(200).send({
        mesage: 'dispositivo eliminado'
    });
}

module.exports = {
    añadirInmueble,
    obtenerInmueble,
    listarInmuebles,
    editarInmueble,
    eliminarInmueble,
    addNuevoDispositivo,
    addTipoDispositivo
}