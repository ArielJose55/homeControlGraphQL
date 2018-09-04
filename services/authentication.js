'use-strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = '**proyecto-control-access-HP**-con-biometria-y_toda_esa_joda**';

function authenticationUser(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(200).send({
            message: 'La peticion no tiene la cabecera de autorizacion'
        });

        let token = req.headers.authorization.replace(/['"]+/g,'');

        try{
            var payload = jwt.decode(token, secret);

            if(payload.exp <= moment.unix()){
                return res.status(404).send({
                    error: 'Token ha caducado'
                });
            }
        }catch(err){
            return res.status(404).send({
                error: 'Token no valido'
            });
        }

    };

    res.propietario = payload;

    next();
}

function authenticationDevice(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(200).send({
            message: 'La peticion no tiene la cabecera de autorizacion'
        });
    }

    let token = req.headers.authorization.replace(/['"]/+g,'');

    try{
        var payloadDevice = jwt.decode(token, secret);

            if(payloadDevice.exp <= moment.unix()){
                return res.status(404).send({
                    error: 'Token ha caducado'
                });
            }
    }catch(err){
        return res.status(404).send({
            error: 'Token no valido'
        });
    }

    req.disposivito = payloadDevice;

    next();
}

module.exports = {
    authenticationUser,
    authenticationDevice
}
