/**Medias de la probabilidad de lluvia por año.*/
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
    mediaProbLluviaAnio : function(req, res)
    {
        //var filtro = filtroAnio(2014);
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("probLluvia",mediasWeather.mediaWeather,res,filtro);
    },

    mediaArmProbLluviaAnio : function(req, res)
    {
        //var filtro = filtroAnio(2014);
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("probLluvia",mediasWeather.mediaArmonicaWeather,res,filtro);
    },

    mediaGeoProbLluviaAnio : function(req, res)
    {
        //var filtro = filtroAnio(2014);
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("probLluvia",mediasWeather.mediaGeometricaWeather,res,filtro);
    }
};