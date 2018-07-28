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
function innerMaxLluvia(datos)
{
    //datos es un array con los objetos retornados por find
    var esPrimerEntrada=true;
    var maxLluvia = 0;
    datos.forEach( element => {
        var entrada = element['probLluvia'];
        console.log("ELEMENTO[lluvia]: " + entrada);
        if(esPrimerEntrada)
        {
            esPrimerEntrada=false;
            maxLluvia = entrada;
        }
        else
        {
            if(entrada > maxLluvia)
            {
                maxLluvia = entrada;
            }
        }
    });
    console.log("INNER_MAX_LLUVIA: " + maxLluvia);
    //meto el maximo en un json
    var resultado = {"label" : "Maximo Prob. Lluvia","data" : maxLluvia};
    return resultado;
}

module.exports = 
{
    maxLluvia : function(req, res){
        const filtro = {};
        envoltorio("probLluvia",innerMaxLluvia,res,filtro);
    }
}