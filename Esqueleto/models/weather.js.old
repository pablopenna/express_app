var mongoose = require('mongoose');
//lista con las direcciones del viento
var path = require('path');
var direccionesViento = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'direccionesViento.js')));
//console.log('DIRECCIONES: ' + direccionesViento);
//defino Schema 
var Schema = mongoose.Schema

var weatherSchema = new Schema(
{
        //Dia de la toma de medidas (fecha)
        //Date.now() -> fecha en ms
        //Obtener dia: 
        //var t = Date.now()
        //var f = new Date(t)
        //var dia = f.getDate()
        //var mes = f.getMonth()
        //var anio = f.getFullYear()
        //Para crear objeto Date() para un año determinaod
        //var miAnio = new Date("2018")

        dia: {
            type: Date,
            required: true,
            default: Date.now
        },
        //Probabilidad de precipitaciones.
        //de 0 a 100 (porcentaje)
        probLluvia: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 100
        },
        //Humedad relativa.
        //de 0 a 100 (porcentaje)
        humedad: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 100
        },
        //Velocidad del viento en
        //km/h. Min 0 max 9999
        velViento: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 9999
        },
        //Direccion del viento.
        //[N,S,E,W,NW,NE,SW,SE]
        dirViento: {
            type: String,
            required: true,
            //default
            uppercase: true,
            //enum: ["N","S","E","W","NW","NE","SW","SE"],
            enum: direccionesViento,
            default: "N"
        },
        //Temperaturas media, maxima y minima.
        temp:{
            media : {
                type: Number,
                required: true,
                default: 0
            },
            max: {
                type: Number,
                required: true,
                default: 0
            },
            min : {
                type: Number,
                required: true,
                default: 0
            }
        }
});

//compilar modelo a partir del schema
var modeloClima = mongoose.model('modeloClima',weatherSchema);
//Exporto modelo
module.exports = modeloClima;