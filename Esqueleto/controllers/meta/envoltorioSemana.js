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
    envoltorioSemana: function (campo, funcion, respuesta, filtro={})
    {
        console.log("THIS IS THE NEW WAVE MAHBOI");
        envoltorioBase(campo, funcion, respuesta, filtro, getSemana, "semana");
    }
}

function getSemana(elemento)
{
    var semanaActual = getWeekNumber(elemento['dia']);
    return semanaActual;
}

/**Dada una fecha devuelve la semana */
//https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    //return [d.getUTCFullYear(), weekNo];
    //just return week number
    return weekNo;
}
