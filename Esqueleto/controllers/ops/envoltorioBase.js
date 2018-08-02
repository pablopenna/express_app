/**Modelo de Mongoose que emplearan todas las funciones llamadas desde envoltorio.
 * En este caso, ModeloClima.
 */
var path = require('path');
var ModeloClima = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));
//Operaciones comunes envoltorio en 'commonEnvoltorioOps.js'
var envOps = require(path.resolve(__dirname, path.join(process.cwd(),
    'controllers', 'ops', 'commonEnvoltorioOps.js')))



module.exports = {
    envoltorioBase :function envoltorioBase(campo, funcion, respuesta, filtro={},
    getTimeUnit, timeUnitName)
    {
        //console.log("campo init: " + campo);
        //console.log("filtro envdia:");
        //console.log(filtro);
        //Si el campo "dia" no se encuentra dentro de la cadena 'campos' lo 
        //añadimos, ya que emplearemos el campo dia para ordenar.
        if(String(campo).indexOf("dia") == -1)
        {
            campo += " dia"
        }
        //console.log("campos: " + campo);

        ModeloClima
            //campo = probLluvia
            //~ .find(filtro).select{probLluvia : 1}.exec(function(datos){...})
            //Con 'sort' ordenamos los datos por fecha ascendente.
            .find(filtro, campo, {sort: {dia: 1}}, function(err,datos)
            {
                if (err)
                {
                    console.log("ERROR: " + err);
                    return err;
                }
                //console.log("DATOS: " + datos);
                //datos es un array con los objetos retornados por find

                //diccionario con los datos segun fechas.
                //Los años seran las claves. Por cada año tendre un
                //vector con los diferentes datos de ese año
                var dataDict = {}
                //Clasifico los datos en la lista 'datos'
                //por años, almacenándolos en 'dataDict'.
                envOps.clasificarDatosTiempo(datos, dataDict, getTimeUnit);
                //console.log("LISTA DEF:");
                //console.log(dataDict);
                //---

                //Iterar a través del objeto
                var resDict = {};
                //Proceso los datos en dataDict por año aplicando
                //la función especificada y almaceno resultados
                //en resDict, clasificados también por año.
                envOps.procesarDatosTiempo(dataDict, resDict, campo, funcion);
                //console.log("RESULTADO DEFINITIVO");
                //console.log(resDict);

                //PARSEAR LOS DATOS PARA CREAR MENSAJE RESPUESTA.
                var resMsg = {};
                //Rellenar resMsg con un formato adecuado para
                //el front-end empleando los datos en resDict.
                envOps.rellenarMensajeRespuesta(resMsg, resDict, campo, filtro, funcion, timeUnitName);
                //Envio respuesta
                respuesta.send(resMsg);
            });
    }
}