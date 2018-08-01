/**Medias de las temperaturas por semana.*/
var path = require('path');
var ModeloClima = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));
//Importo función envoltorioAnio() en envoltorioAnio.js
var envoltorio = require(path.resolve(__dirname, 
    path.join(process.cwd(), 'controllers', 'ops', 'dia', 'envoltorioDia.js'))
)['envoltorioDia'];
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
    mediaTempDia : function(req, res)
    {
        //res.locals.filtro estará al menos inicializado a '{}' mediante
        //un middleware.
        var filtro = res.locals.filtro;
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("temp",mediasWeather.mediaWeather,res,filtro);
    },

    mediaArmTempDia : function(req, res)
    {
        //res.locals.filtro estará al menos inicializado a '{}' mediante
        //un middleware.
        var filtro = res.locals.filtro;
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("temp",mediasWeather.mediaArmonicaWeather,res,filtro);
    },

    mediaGeoTempDia : function(req, res)
    {
        //res.locals.filtro estará al menos inicializado a '{}' mediante
        //un middleware.
        var filtro = res.locals.filtro;
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("temp",mediasWeather.mediaGeometricaWeather,res,filtro);
    }
};