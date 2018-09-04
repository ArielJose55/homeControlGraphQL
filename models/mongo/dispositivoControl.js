'use-strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DispositivoControl = mongoose.model('dispositivo_control', new Schema({
    nivel_de_estados: {
        type: Number,
        min: 2,
        requered: true,
        alias: 'NivelDeEstados'
    },
    nivel: {
        type: Number,
        requered: true
    },
    id_dispositivo: {
        type: Number,
        requered: true,
        unique: true
    }
}));

module.exports = DispositivoControl;
