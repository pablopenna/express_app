/**Medias de las precipitaciones */
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
    mediaPrecipitaciones : function(req, res)
    {
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("precipitaciones",mediasWeather.mediaWeather,res,filtro);
    },

    mediaArmPrecipitaciones : function(req, res)
    {
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("precipitaciones",mediasWeather.mediaArmonicaWeather,res,filtro);
    },

    mediaGeoPrecipitaciones : function(req, res)
    {
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("precipitaciones",mediasWeather.mediaGeometricaWeather,res,filtro);
    }
};