'use-strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = '**proyecto-control-access-HP**-con-biometria-y_toda_esa_joda**';

function createTokenUser(propietario){
    let payload={
        sub: propietario.id_propietario,
        username: propietario.username,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix()
    };
    return jwt.encode(payload,secret);
}

function createTokenDevice(dispositivo){
    let payload={
        sub: dispositivo.id_dispositivo,
        numeroSerial: dispositivo.numeroSerial,
        estado: dispositivo.estado,
        ubicacion: dispositivo.ubicacion,
        fechaDeFuncionamiento: dispositivo.fechaDeFuncionamiento,
        createdAt: dispositivo.createdAt,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix()
    };
    return jwt.encode(payload, secret);
}

module.exports={
    createTokenUser,
    createTokenDevice
};

