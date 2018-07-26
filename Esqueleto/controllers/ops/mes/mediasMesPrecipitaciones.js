/**Medias de las precipitaciones por mes.*/
var path = require('path');
var ModeloClima = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));
//Importo función envoltorioAnio() en envoltorioAnio.js
var envoltorio = require(path.resolve(__dirname, 
    path.join(process.cwd(), 'controllers', 'ops', 'mes', 'envoltorioMes.js'))
)['envoltorioMes'];
//Modulo con medias
var mediasWeather = require(path.resolve(__dirname, path.join(process.cwd(),
'controllers', 'ops', 'medias.js')));



module.exports = {
    /**Los campos especificados de la
     * base de datos para trabajar con ellos deben
     * de estar contenidos en la siguiente lista:
     * ['dia','probLluvia','precipitaciones',
     * 'humedad','velViento','temp','presion']
     */
    mediaPrecipitacionesMes : function(req, res)
    {
        //res.locals.filtro estará al menos inicializado a '{}' mediante
        //un middleware.
        var filtro = res.locals.filtro;
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("precipitaciones",mediasWeather.mediaWeather,res,filtro);
    },

    mediaArmPrecipitacionesMes : function(req, res)
    {
        //res.locals.filtro estará al menos inicializado a '{}' mediante
        //un middleware.
        var filtro = res.locals.filtro;
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("precipitaciones",mediasWeather.mediaArmonicaWeather,res,filtro);
    },

    mediaGeoPrecipitacionesMes : function(req, res)
    {
        //res.locals.filtro estará al menos inicializado a '{}' mediante
        //un middleware.
        var filtro = res.locals.filtro;
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("precipitaciones",mediasWeather.mediaGeometricaWeather,res,filtro);
    }
};