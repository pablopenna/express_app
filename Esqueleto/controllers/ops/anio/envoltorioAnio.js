/**Modelo de Mongoose que emplearan todas las funciones llamadas desde envoltorio.
 * En este caso, ModeloClima.
 */
var path = require('path');
var ModeloClima = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));


//---

//---


/**Funcion envoltorio.
 * Recibirá como parámetros:
 * -> El campo(s) separados por espacios que empleará la
 * función.
 * -> La función que deberá aplicar 
 * a los datos para obtenerun resultado (p.ej: mediaLluvia).
 * -> Necesita también la respuesta como parámetro, ya que dentro
 * de modeloMongoose.find().exec(function(){
 * ...
 * });
 * es asíncrono y tengo que devolver el resultado
 * de las operaciones con respuesta.send().
 * -> Filtro para filtrar todos los documentos obtenidos.
 * Si se omite no se filtrarán los resultados obtenidos, o
 * sea, que se emplearán todos los documentos en MongoDB.
 */
module.exports = {
    envoltorioAnio :function envoltorioAnio(campo, funcion, respuesta, filtro={})
    {
        console.log("campo init: " + campo);
        //Si el campo "dia" no se encuentra dentro de la cadena 'campos' lo 
        //añadimos, ya que emplearemos el campo dia para ordenar.
        if(String(campo).indexOf("dia") == -1)
        {
            campo += " dia"
        }
        console.log("campos: " + campo);

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
                console.log("DATOS: " + datos);
                //datos es un array con los objetos retornados por find

                //diccionario con los datos segun fechas.
                //Los años seran las claves. Por cada año tendre un
                //vector con los diferentes datos de ese año
                var dataDict = {}
                datos.forEach(element =>
                {
                    var anioActual = element['dia'].getFullYear();
                    console.log("Anio: " + anioActual);
                    //Si no hay datos todavia para ese año creo lista
                    if(dataDict[anioActual]==undefined)
                    {
                        dataDict[anioActual] = [];
                    }
                    //añado datos de la entrada actual a la lista
                    //para el año en el que etan registrados los datos
                    dataDict[anioActual].push(element);
                });
                console.log("LISTA DEF:");
                console.log(dataDict);
                //---

                //Iterar a través del objeto
                var resVector = {};
                //Itero a través de las 'claves' del diccionario.
                //Cada una de ellas se correspondera con un año
                for (var year in dataDict) {
                    if (dataDict.hasOwnProperty(year)) {
                        // do stuff
                        var res = funcion(dataDict[year], campo.split(" ")[0])
                        console.log("Anio "+year+" : " + res);
                        //Añado solucion al objecto que contiene los resultados
                        resVector[year] = res;
                    }
                }
                console.log("RESULTADO DEFINITIVO");
                console.log(resVector);

                var resMsg = {};
                resMsg['op'] = [];
                resMsg['res'] = [];
                for (var key in resVector) {
                    if (resVector.hasOwnProperty(key)) {
                        // do stuff
                        resMsg['op'].push(key);
                        resMsg['res'].push(resVector[key]);
                    }
                }
                respuesta.send(resMsg);
                //res.send(datos);
                //Pasamos como parámetro solo el primer campo en caso
                //de que se hayan especificado varios separados por espacios
                //var resultadoOP = funcion(datos, campo.split(" ")[0]);
                //Metemos resultado en json
                //var res = {"op" : String(funcion).split(/[ (]/)[1]+" "+campo
                //,"res" : resultadoOP};
                //console.log("RES ENVOLTORIO: " + res);
                //respuesta.send(res);
            });
    },
    /**Devuelve filtro de Mongoose para la fecha indicada.
     * Pensado para recibir un año como paŕametro.
    */
    filtroAnio : function(fecha)
    {
        const fechaMin = new Date(String(fecha));
        const fechaMax = new Date(String(fecha+1));
        const filtro = {dia :{$gt: fechaMin, $lt: fechaMax}};
        return filtro;
    }
}