/**Modelo de Mongoose que emplearan todas las funciones llamadas desde envoltorio.
 * En este caso, ModeloClima.
 */
var path = require('path');
var ModeloClima = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));
//Plantilla envoltorio: envoltorioBase.js
var envoltorioBase = require(path.resolve(__dirname, path.join(process.cwd(),
    'controllers', 'meta', 'envoltorioBase.js')))['envoltorioBase'];

//---

//---


/**Funcion envoltorio.
 * Recibirá como parámetros:
 * -> El campo(s) separados por espacios que empleará la
 * función.
 * -> La función que deberá aplicar 
 * a los datos para obtenerun resultado (p.ej: mediaLluvia).
 * -> Necesita también la respuesta como parámetro, ya que dentro
 * de modeloMongoose.find().exec(function(){
 * ...
 * });
 * es asíncrono y tengo que devolver el resultado
 * de las operaciones con respuesta.send().
 * -> Filtro para filtrar todos los documentos obtenidos.
 * Si se omite no se filtrarán los resultados obtenidos, o
 * sea, que se emplearán todos los documentos en MongoDB.
 */
module.exports = {
    envoltorioMes: function(campo, funcion, respuesta, filtro={})
    {
        console.log("THIS IS THE NEW WAVE MAHBOI");
        envoltorioBase(campo, funcion, respuesta, filtro, getMes, "mes");
    }
}

//Obtengo la fecha (mes) de la entrada actual.
//Le sumo uno ya que js contempla las fechas de 0 a 11.
function getMes(elemento)
{
    var mesActual = elemento['dia'].getMonth()+1;
    return mesActual;
}
