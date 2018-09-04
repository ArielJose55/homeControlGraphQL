'use-strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var RegistroMedida = mongoose.model('RegistroMedida', new Schema({
    valor: {
        type: String,
        requered: true
    },
    fecha: {
        type: Date,
        requered: false,
        default: Date.now
    },
    id_sensor: {
        type: Number,
        requered: true
    }
}));

module.exports = RegistroMedida;
