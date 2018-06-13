//var MiModelo = require('../models/weather.js');
var path = require('path');
var MiModelo = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));

//Lista con las direcciones del viento.
const direccionesViento = ["N","S","E","W","NW","NE","SW","SE"]

//Borrar la base de datos y crear 1000 entradas aleatorias.

/* VALORES ALEATORIOS */
/* Devuelve numero aleatorio entre minimo y maximo */
function getRandom(min, max) {
    //Float
    //return Math.random() * (max - min) + min;
    //Int
    
        min = Math.ceil(min);
        //Maximo exclusivo por lo que sumo 1
        //para que sea inclusivo.
        max = Math.floor(max) + 1;
        //The maximum is exclusive and the minimum is inclusive
        return Math.floor(Math.random() * (max - min)) + min; 
}

/*Fecha aleatoria.
De 2000 a 2018 */
function getRandomDate()
{
    var anio = getRandom(2000,2018);
    var mes = getRandom(1,12);
    //No pasa nada si metemos 31 de feberero,
    //la fecha pasara a ser el 3 de marzo.
    var dia = getRandom(1,31);
    var fecha = new Date(anio,mes,dia);
    return fecha;
}

/*Probabilidad precipitaciones aleatoria.
Min 0 Max 100 */
function getRandomProbLluvia()
{
    return getRandom(0,100);
}

/*Humedad aleatoria.
Min 0 Max 100 */
function getRandomHumedad()
{
    return getRandom(0,100);
}

/*Velocidad de viento aleatoria.
Min 0 Max 150 (El modelo permite hasta 9999) */
function getRandomVelViento()
{
    return getRandom(0,150);
}

/*Dirección viento aleatoria.
N,S,W,E,NW,NE,SW,SE */
function getRandomDirViento()
{
    var indice = getRandom(0,direccionesViento.length);
    return direccionesViento[indice];
}

/*Temperatura aleatoria. La empleare para temp max, media y min.
 Se admite cualq numero en el modelo. Aqui generaré
 números del -10 a 40 para que sean mas o menos creibles*/
function getRandomTemp()
{
    return getRandom(-10,40);
}

/* Solo exporto funciones dentro de module.exports. */
module.exports = {
    //Función principal.
    resetDB : function(req, res)
    {
        var myval = {};
        myval['fecha'] = getRandomDate();
        myval['lluvia'] = getRandomProbLluvia();
        myval['humedad'] = getRandomHumedad();
        myval['velViento'] = getRandomVelViento();
        myval['dirViento'] = getRandomDirViento();
        myval['tempMedia'] = getRandomTemp();
        myval['tempMax'] = getRandomTemp();
        myval['tempMin'] = getRandomTemp();

        res.send('Esto es: ' + JSON.stringify(myval));
    }

    //Borrar la base de datos.

    //Crear entradas

    //Datos aleatorios.

}