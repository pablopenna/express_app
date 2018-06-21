/**Media de la probabilidad de lluvia () */
var path = require('path');
var ModeloClima = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));
//Importo función envoltorio() en envoltorio.js
var envoltorio = require(path.resolve(__dirname, 
    path.join(process.cwd(), 'controllers', 'ops', 'envoltorio.js'))
)['envoltorio'];
//Importo función filtroAnio() en envoltorio.js
var filtroAnio = require(path.resolve(__dirname, 
    path.join(process.cwd(), 'controllers', 'ops', 'envoltorio.js'))
)['filtroAnio'];

/**Recibe los datos de la base de datos como parámetro
 * y los emeplea para calcular la media del campo
 * 'probLluvia'.
 */
function innerMediaLluvia(datos)
{
    //datos es un array con los objetos retornados por find
    //res.send(datos);
    //MEDIA
    var sumatorio = 0;
    var numElementos = 0;
    datos.forEach( element => {
        console.log("ELEMENTO[lluvia]: " + element['probLluvia']);
        sumatorio += element['probLluvia'];
        numElementos++;
    });
    console.log("LONG: " + numElementos);
    var media = sumatorio/numElementos;
    //meto la media en un json
    var resultado = {"op" : "Media Prob. Lluvia","res" : media};
    console.log("INNER_MEDIA: " + resultado);
    return resultado;
}

module.exports = {
    /**prueba */
    mediaLluvia : function(req, res)
    {
        //var filtro = filtroAnio(2014);
        var filtro = {};
        //envoltorio(<campos>,<funcion>,<respuesta>,<filtro>)
        var datos = envoltorio("probLluvia dirViento",innerMediaLluvia,res,filtro);
    }
};