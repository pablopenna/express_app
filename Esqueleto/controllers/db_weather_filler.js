//var MiModelo = require('../models/weather.js');
var path = require('path');
var ModeloClima = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));
var ClimaBasicOps = require(path.resolve(__dirname, path.join(process.cwd(), 'controllers', 'db_worker_weather.js')));
var direccionesViento = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'direccionesViento.js')));
//console.log('ATENTION: ' + ClimaBasicOps.clearData);

//Numero de entradas en la base de datos
const numEntries = 1000;

//Lista con las direcciones del viento.
//const direccionesViento = ["N","S","E","W","NW","NE","SW","SE"]

//Borrar la base de datos y crear 1000 entradas aleatorias.

/* VALORES ALEATORIOS.
Devuelve numero aleatorio entre minimo y maximo */
function getRandom(min, max) {
    //Float
    //return Math.random() * (max - min) + min;
    //Int
    
        min = Math.ceil(min);
        //Maximo exclusivo por lo que sumo 1
        //para que sea inclusivo en la operación 
        //de la línea 26.
        max = Math.floor(max) + 1;
        //The maximum is exclusive and the minimum is inclusive
        return Math.floor(Math.random() * (max - min)) + min; 
}

/*Fecha aleatoria.
De 2000 a 2018 */
function getRandomDate(){
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
function getRandomProbLluvia(){
    return getRandom(0,100);
}

/*Humedad aleatoria.
Min 0 Max 100 */
function getRandomHumedad(){
    return getRandom(0,100);
}

/*Velocidad de viento aleatoria.
Min 0 Max 150 (El modelo permite hasta 9999) */
function getRandomVelViento(){
    return getRandom(0,150);
}

/*Dirección viento aleatoria.
N,S,W,E,NW,NE,SW,SE */
function getRandomDirViento(){
    console.log("LONGITUD VIENTOS: " + direccionesViento.length);
    //El segundo argumento es inclusivo por
    //lo que tendremos que restarle 1 para
    //que no se salga del array.
    var indice = getRandom(0,direccionesViento.length-1);
    console.log('INDICE VIENTO: ' + indice);
    var dir = direccionesViento[indice];
    console.log('VIENTO A DEVOLVER: ' + dir);
    return dir;
}

/*Temperatura aleatoria. La empleare para temp max, media y min.
 Se admite cualq numero en el modelo. Aqui generaré
 números del -10 a 40 para que sean mas o menos creibles*/
function getRandomTemp(){
    return getRandom(-10,40);
}

/*Temperatura aleatoria. La empleare para temp max, media y min.
 Se admite cualq numero en el modelo. Aqui generaré
 números del -10 a 40 para que sean mas o menos creibles*/
 function getAllRandomTemps(){
    var temp = {};
    temp['media'] = getRandom(-10,40);
    temp['max'] = getRandom(temp['media'],40);
    temp['min'] = getRandom(-10,temp['media']);
    
    return temp;
}

/*Wrapper de todas las funciones. Devolverá
un objeto JSON con los campos y sus valores
aleatorios para crear una instancia del modelo
de clima en la base de datos
*/
function getRandomWeather(){
    var randomWeather = {};
    randomWeather['dia'] = getRandomDate();
    randomWeather['probLluvia'] = getRandomProbLluvia();
    randomWeather['humedad'] = getRandomHumedad();
    randomWeather['velViento'] = getRandomVelViento();
    randomWeather['dirViento'] = getRandomDirViento();
    //randomWeather['temp.media'] = getRandomTemp();
    //randomWeather['temp.max'] = getRandomTemp();
    //randomWeather['temp.min'] = getRandomTemp();
    randomWeather['temp'] = getAllRandomTemps();
    return randomWeather;
}

//Muestra como se envia un post.
//Funcion de prueba. Debería recibir
//más parámetros como la uri o el método.
function sendPost(myval) {
    var request = require('request');
 
    var clientServerOptions = {
        uri: 'http://localhost:3000/weather',
        body: JSON.stringify(myval),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, function (error, response) {
        console.log('POST: '+error,response.body);
        return;
    });
}
/* Solo exporto funciones dentro de module.exports. */
module.exports = {
    //Función principal.
    resetDB : function(req, res)
    {
        //Limpio datos
        ClimaBasicOps.clearData();
        //Genero valores aleatorios
        var myval = getRandomWeather();
        //Si el metodo es GET, es a traves del navegador
        if (req.method == 'GET'){
            res.send('Esto es: ' + JSON.stringify(myval));
        }
        //Enviar POST para registrar
        //sendPost(myval);
        //En lugar de utilizar peticiones POST
        //usaremos los métodos proporcionados por
        //mongoose
        for(i=0;i<numEntries;i++)
        {
            if(i>0)
            {
                myval = getRandomWeather();
            }
            ModeloClima.create(myval, function(err, datos)
            {
                if (err)
                {
                    console.log("ERROR: " + err);
                    res.send(err);
                    return err;
                }
                //console.log('COMPROBAR: ' + JSON.stringify(myval));
                console.log('CREACION: ' + datos);   
            });
        }
        console.log("RESET FINISHED!");
        //Si el metodo es POST, es a traves de la aplicacion
        if (req.method == 'POST'){
            res.send('RESET FINISHED');
        }
    }

    //Borrar la base de datos.

    //Crear entradas

    //Datos aleatorios.

}