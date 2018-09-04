'use-strit'

const fs = require('fs');
const path = require('path');
const bcryptNodejs = require('bcrypt-nodejs');
const jwtToken = require('../services/tokenAuthentication');
const Residente = require('../models').Residente;
const Propietario = require('../models').Propietario;
const log4js = require('log4js');

const log = log4js.getLogger('ControllerResidente');

function obtenerInmuble(req, res) {
    res.status(200).send({
        holla: 'Hola Mama'
    });
}

function guardarPropietario(req, res) {

    const params = req.body;

    let propietarioIn = {
        username: params.username,
        id_inmueble_fk: params.id_inmueble,
        id_residente_fk: params.id_residente
    };
    
    bcryptNodejs.hash(params.password, null, null, (err, hash) => {
        if (err) {
            res.status(500).send({
                error: 'Ouups! Ocurrío un error inesperado en la solicitud, vuelva a intentarlo'
            });
        } else {
            propietarioIn.password = hash;
            Propietario.create(propietarioIn).then((propietario) => {
                if (propietario) {
                    res.status(200).send({
                        propietario: propietario
                    });
                } else {
                    res.status(300).send({
                        error: 'Ouups! Ocurrío un error inesperado en la solicitud, vuelva a intentarlo'
                    });
                }
            }).catch((err) => {
                res.status(400).send({
                    error: err
                });
            });

        }
    });
}

function verificarPropietario(req, res) {
    const params = req.body;

    let propietarioIn = {
        username: params.username
    };   
    
    Propietario.find(propietarioIn).then((propietario) => {
        if (propietario) {
            console.log(propietario);
            bcryptNodejs.compare(params.password, propietario.password, function (err, check){
                if (err) {
                    res.status(500).send({
                        error: 'Ouups! Ocurrío un error inesperado en la solicitud, vuelva a intentarlo'
                    });
                } else {

                    if (check) {
                        if (params.getHash) {
                            res.status(200).send({
                                token: jwtToken.createTokenUser(propietario)
                            });
                        } else {
                            res.status(200).send({
                                propietario: propietario
                            });
                        }
                    } else {
                        res.status(300).send({
                            error: 'Username o la contraseña son incorrectas'
                        });
                    }
                }
            });
        } else {
            res.status(400).send({
                error: 'El propietario con este username no existe'
            });
        }
    }).catch((err) => {
        res.status(400).send({
            error: err
        });
    });

}

function guardarResidente(req, res){
    let params = req.body;

    let residenteIn = {
        identificacion: params.identificacion,
        tipoDeIdentificacion: params.tipo_de_identificacion,
        nombres: params.nombres,
        apellidos: params.apellidos,
        id_inmueble_fk: params.id_inmueble
    };

    Residente.create(residenteIn).then((residente)=>{
        if(residente){
            res.status(200).send({
                residente: residente
            });
        }else{
            res.status(300).send({
                error: 'Ouups! Ocurrío un error inesperado en la solicitud, vuelva a intentarlo'
            });
        }
    }).catch((err)=>{
        res.status(400).send({
            error: err
        });
    });
}

function subirImagen(req, res){
    let idResidente  = req.params.id;
    let result = "No subido";

    if(req.files){
        let file_path = req.files.image.path.split('\\')[3];
        let ext_file = file_path.split('.')[1];

        if(ext_file == 'jpg' || ext_file == 'png'){
            Residente.findById(idResidente).then((residente)=>{
                if(residente){
                    residente.update({image : file_path}).then((residenteImage)=>{
                        res.status(200).send({
                            image: residenteImage.image
                        });
                    }).catch((err)=>{
                        res.status(400).send({
                            error: err
                        });
                    });
                }else{
                    res.status(300).send({
                        error: 'Residente no existe'
                    });
                }
            }).catch((err)=>{
                res.status(400).send({
                    error: err
                });
            });
        }else{
            res.status(400).send({
                error: 'Ouups! el formato de la imagen no es valido'
            });
        }        
    }else{
        res.status(300).send({
            error: 'Ouups! No se encontro ninguna imagen'
        });
    }
}

function obtenerImagen(req, res){
    let image = "./resources/imagenes/perfil/".concat(req.params.image);

    fs.exists(image, (exist)=>{
        if(exist){
            res.sendFile(path.resolve(image));
        }else{
            res.status(303).send({
                error: 'Ouups! La imagen no existe'
            });
        }
    });
}

module.exports = {
    obtenerInmuble,
    verificarPropietario,
    guardarPropietario,
    guardarResidente,
    subirImagen,
    obtenerImagen
};