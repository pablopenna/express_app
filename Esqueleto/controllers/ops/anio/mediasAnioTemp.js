/**Medias de la temperatura por año.*/
var path = require('path');
var ModeloClima = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));
//Importo función envoltorioAnio() en envoltorioAnio.js
var envoltorio = require(path.resolve(__dirname, 
    path.join(process.cwd(), 'controllers', 'ops', 'anio', 'envoltorioAnio.js'))
)['envoltorioAnio'];
//Importo función filtroAnio() en envoltorioAnio.js
var filtroAnio = require(path.resolve(__dirname, 
    path.join(process.cwd(), 'controllers', 'ops', 'anio', 'envoltorioAnio.js'))
)['filtroAnio'];
//Modulo con medias
var mediasWeather = require(path.resolve(__dirname, path.join(process.cwd(), 'controllers', 'ops', 'medias.js')));



module.exports = {
    /**Los campos especificados de la
     * base de datos para trabajar con ellos deben
     * de estar contenidos en la siguiente lista:
     * ['dia','probLluvia','precipitaciones',
     * 'humedad','velViento','temp','presion']
     */
    mediaTempAnio : function(req, res)
    {
        //var filtro = filtroAnio(2014);
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("temp",mediasWeather.mediaWeather,res,filtro);
    },

    mediaArmTempAnio : function(req, res)
    {
        //var filtro = filtroAnio(2014);
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("temp",mediasWeather.mediaArmonicaWeather,res,filtro);
    },

    mediaGeoTempAnio : function(req, res)
    {
        //var filtro = filtroAnio(2014);
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("temp",mediasWeather.mediaGeometricaWeather,res,filtro);
    }
};