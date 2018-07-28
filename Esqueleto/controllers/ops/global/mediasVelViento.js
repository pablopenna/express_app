/**Medias de la velocidad del viento.*/
var path = require('path');
var ModeloClima = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));
//Importo función envoltorio() en envoltorio.js
var envoltorio = require(path.resolve(__dirname, 
    path.join(process.cwd(), 'controllers', 'ops', 'global', 'envoltorio.js'))
)['envoltorio'];
//Modulo con medias
var mediasWeather = require(path.resolve(__dirname, path.join(process.cwd(), 'controllers', 'ops', 'medias.js')));



module.exports = {
    /**Los campos especificados de la
     * base de datos para trabajar con ellos deben
     * de estar contenidos en la siguiente lista:
     * ['dia','probLluvia','precipitaciones',
     * 'humedad','velViento','temp','presion']
     */
    mediaVelViento : function(req, res)
    {
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("velViento",mediasWeather.mediaWeather,res,filtro);
    },

    mediaArmVelViento : function(req, res)
    {
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("velViento",mediasWeather.mediaArmonicaWeather,res,filtro);
    },

    mediaGeoVelViento : function(req, res)
    {
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("velViento",mediasWeather.mediaGeometricaWeather,res,filtro);
    }
};