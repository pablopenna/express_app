/**Máximo de la probabilidad de lluvia () */
var path = require('path');
var ModeloClima = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));
//Importo función envoltorio() en envoltorio.js
var envoltorio = require(path.resolve(__dirname, 
    path.join(process.cwd(), 'controllers', 'ops', 'global', 'envoltorio.js'))
)['envoltorio'];


/**Recibe los datos de la base de datos como parámetro
 * y los emeplea para calcular el máximo del campo
 * 'probLluvia'.
 */
function innerMinLluvia(datos)
{
    //datos es un array con los objetos retornados por find
    var esPrimerEntrada=true;
    var minLluvia = 101;
    datos.forEach( element => {
        var entrada = element['probLluvia'];
        console.log("ELEMENTO[lluvia]: " + entrada);
        if(esPrimerEntrada)
        {
            esPrimerEntrada=false;
            minLluvia = entrada;
        }
        else
        {
            if(entrada < minLluvia)
            {
                minLluvia = entrada;
            }
        }
    });
    console.log("INNER_MIN_LLUVIA: " + minLluvia);
    //meto el maximo en un json
    var resultado = {"label" : "Minimo Prob. Lluvia","data" : minLluvia};
    return resultado;
}

module.exports = 
{
    minLluvia : function(req, res){
        const filtro = {};
        //envoltorio(campo, funcion, respuesta, filtro={})
        envoltorio("probLluvia",innerMinLluvia,res,filtro);
    }
}