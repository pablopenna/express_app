var mongoose = require('mongoose');

//defino Schema 
var Schema = mongoose.Schema

var myModelSchema = new Schema(
    {
        numero: Number,
        cadena: String
    });

//compilar modelo a partir del schema
var miModelo = mongoose.model('miModelo',myModelSchema);
//Exporto modelo
module.exports = miModelo;