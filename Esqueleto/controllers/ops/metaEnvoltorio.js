var path = require('path');
var ModeloClima = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));
//Importo función envoltorioAnio() en envoltorioAnio.js
var envoltorioGlobal = require(path.resolve(__dirname, 
    path.join(process.cwd(), 'controllers', 'ops', 'global', 'envoltorio.js'))
)['envoltorio'];
//Importo función envoltorioAnio() en envoltorioAnio.js
var envoltorioAnio = require(path.resolve(__dirname, 
    path.join(process.cwd(), 'controllers', 'ops', 'anio', 'envoltorioAnio.js'))
)['envoltorioAnio'];
//Importo función envoltorioMes() en envoltorioMes.js
var envoltorioMes = require(path.resolve(__dirname, 
    path.join(process.cwd(), 'controllers', 'ops', 'mes', 'envoltorioMes.js'))
)['envoltorioMes'];
//Importo función envoltorioSemana() en envoltorioSemana.js
var envoltorioSemana = require(path.resolve(__dirname, 
    path.join(process.cwd(), 'controllers', 'ops', 'semana', 'envoltorioSemana.js'))
)['envoltorioSemana'];
/*
//Importo función envoltorioDia() en envoltorioDia.js
var envoltorioDia = require(path.resolve(__dirname, 
    path.join(process.cwd(), 'controllers', 'ops', 'dia', 'envoltorioDia.js'))
)['envoltorioDia'];
*/
//Modulo con medias
var mediasWeather = require(path.resolve(__dirname, path.join(process.cwd(),
'controllers', 'ops', 'medias.js')));


function esCampoValido(campo, esMinuscula=false)
{
    //Obtengo lista campos del modelo
    //lista con los campos
    var listaCampos = [];
    ModeloClima.schema.eachPath(function(path){
        if(esMinuscula)
        {
            listaCampos.push(path.toLowerCase());
        }
        else
        {
            listaCampos.push(path);
        }
    });
    console.log("· campos: "+listaCampos);
    //Compruebo si el campo especificado se encuentra en el.
    var campoValido = listaCampos.indexOf(campo) >= 0; 
    return campoValido;
}

module.exports =
{
    //app.route('/ops/:periodo/:tipoMedia/:campo')
    metaEnvoltorio: function(req,res)
    {
        //FILTRO.
        //Calculado por el middleware y almacenado en res.locals.filtro.
        var filtro = res.locals.filtro;

        /**
         * El período especificado puede ser:
         * -> global
         * -> anio
         * -> mes
         * -> semana
         * -> dia
         * Del valor especificado dependerá el envoltorio a emplear.
         */
        var periodo = req.params.periodo;
        /**
         * Las diferentes medias que hay son:
         * -> mediasWeather.mediaWeather
         * -> mediasWeather.mediaArmonicaWeather
         * -> mediasWeather.mediaGeometricaWeather
         * Del valor especificado dependerá la media a emplear.
         */
        var tipoMedia = req.params.tipoMedia;
        /**Los campos especificados de la
         * base de datos para trabajar con ellos deben
         * de estar contenidos en la siguiente lista:
         * ['dia','probLluvia','precipitaciones',
         * 'humedad','velViento','temp','presion']
         * Del valor especificado dependerá el campo sobre
         * el que realizar la media.
         */
        var campo = req.params.campo;

        //DEBUG
        console.log("· periodo: " + periodo);
        console.log("· media: " + tipoMedia);
        console.log("· campo: " + campo);
        var campoValido = esCampoValido(campo); 
        console.log("Campo valido?: " + campoValido);

        //FILTRADOS PARAMETROS
        //Envoltorio
        var miEnvoltorio = envoltorioGlobal;
        switch(periodo.toLowerCase())
        {
            case 'anio':
                miEnvoltorio = envoltorioAnio;
                break;
            case 'mes':
                miEnvoltorio = envoltorioMes;
                break;
            case 'semana':
                miEnvoltorio = envoltorioSemana;
                break;
            case 'dia':
                //miEnvoltorio = envoltorioDia;
                break;
        }
        //MEDIA
        var miMedia = mediasWeather.mediaWeather;
        switch(tipoMedia.toLowerCase())
        {
            case 'media':
                miMedia = mediasWeather.mediaWeather;
                break;
            case 'mediaarm':
                miMedia = mediasWeather.mediaArmonicaWeather;
                break;
            case 'mediageo':
                miMedia = mediasWeather.mediaGeometricaWeather;
                break;
        }
        //Campo
        var miCampo = "temp"
        if(campoValido)
        {
            miCampo=campo;
        }

        miEnvoltorio(miCampo,miMedia,res,filtro);

        //res.send({"data":[periodo,tipoMedia,campo,campoValido]});
    }
}