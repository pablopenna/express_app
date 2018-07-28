/**Medias de la humedad relativa.*/
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
    mediaHumedad : function(req, res)
    {
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("humedad",mediasWeather.mediaWeather,res,filtro);
    },

    mediaArmHumedad : function(req, res)
    {
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("humedad",mediasWeather.mediaArmonicaWeather,res,filtro);
    },

    mediaGeoHumedad : function(req, res)
    {
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("humedad",mediasWeather.mediaGeometricaWeather,res,filtro);
    }
};