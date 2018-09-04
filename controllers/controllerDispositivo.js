'use-strict'

const Dispositivo = require('../models/index').Dispositivo;
const Sensor = require('../models/index').Sensor;
const RegistroMedida = require('../models/mongo/registroMedida');
const DispositivoControl = require('../models/mongo/dispositivoControl');


function añadirSensor(req, res) {
    let params = req.body;

    let sensorIn = {
        tipo: params.tipo,
        metrica: params.metrica,
        seudonimo: params.seudonimo,
        id_dispositivo_fk: params.dispositivo
    };

    Sensor.create(sensorIn).then((sensor) => {
        if (sensor) {
            res.status(200).send({
                sensor: sensor
            });
        } else {
            res.status(400).send({
                error: 'Ouups! No fue posible agreagar este sensor'
            });
        }
    }).catch((err) => {
        res.status(500).send({
            error: err
        });
    });
}


function enviarDatos(req, res) {
    let params = req.body;

    let dispositivoIn = {
        numeroSerial: params.numero_serial
    };

    Dispositivo.find(dispositivoIn).then((dispositivo) => {
        if (dispositivo) {

            Sensor.findOne({
                where: {
                    id_dispositivo_fk: dispositivo.idDispositivo
                }
            }).then((sensor) => {
                if (sensor) {
                    let medida = new RegistroMedida({
                        valor: params.value,
                        id_sensor: sensor.idSensor
                    });

                    medida.save().then((medidaSave) => {
                        if (medidaSave) {
                            res.status(200).send({
                                dispositivo: dispositivo,
                                sensor: sensor,
                                medida: medidaSave
                            });
                        } else {
                            res.status(400).send({
                                error: 'Oupp! El valor no fue registrado'
                            });
                        }
                    }).catch(err => {
                        res.status(500).send({
                            error: String(err)
                        });
                    });
                } else {
                    res.status(400).send({
                        error: 'No existe nungun sensor registrado con ese numero serial'
                    });
                }
            }).catch((err) => {
                res.status(500).send({
                    error: String(err)
                });
            });
        } else {
            res.status(400).send({
                error: 'No existe nungun dispositivo registrado con ese numero serial'
            });
        }
    }).catch((err) => {
        res.status(500).send({
            error: String(err)
        });
    });

}

function añadirDispositivoControl(req, res) {
    const params = req.body;
    let deviceIn = {
        estado: params.estado,
        ubicacion: params.ubicacion,
        id_tipo_fk: params.id_tipo,
        id_inmueble_fk: params.id_inmueble
    };

    Dispositivo.findOrCreate({
        where: {
            numeroSerial: params.numero_serial
        },
        default: deviceIn
    }).spread((dispositivo, created) => {
        if (dispositivo) {
            let control = {
                nivel_de_estados: params.nivel_de_estados,
                nivel: params.nivel,
                id_dispositivo: dispositivo.idDispositivo
            };
            DispositivoControl.create(control, (err, saveCreated) => {
                if (err) {
                    res.status(500).send({
                        error: 'Error en la peticion'
                    });
                } else {
                    if (saveCreated) {
                        res.status(500).send({
                            dispositivo: dispositivo,
                            dispositivoControl: saveCreated
                        });
                    } else {
                        res.status(400).send({
                            error: 'Ouups! no fue posible guardar el dispositivo'
                        });
                    }
                }
            });
        } else {
            res.status(400).send({
                error: 'No existe nungun dispositivo registrado con ese numero serial'
            });
        }
    }).catch((err) => {
        res.status(400).send({
            error: err
        });
    });
}

module.exports = {
    enviarDatos,
    añadirSensor
};