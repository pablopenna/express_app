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
                //Clasifico los datos en la lista 'datos'
                //por años, almacenándolos en 'dataDict'.
                clasificarDatosAnio(datos, dataDict);
                console.log("LISTA DEF:");
                console.log(dataDict);
                //---

                //Iterar a través del objeto
                var resDict = {};
                //Proceso los datos en dataDict por año aplicando
                //la función especificada y almaceno resultados
                //en resDict, clasificados también por año.
                procesarDatosAnio(dataDict, resDict, campo, funcion);
                console.log("RESULTADO DEFINITIVO");
                console.log(resDict);

                //PARSEAR LOS DATOS PARA CREAR MENSAJE RESPUESTA.
                var resMsg = {};
                //Rellenar resMsg con un formato adecuado para
                //el front-end empleando los datos en resDict.
                rellenarMensajeRespuesta(resMsg, resDict, campo, filtro, funcion);
                //Envio respuesta
                respuesta.send(resMsg);
            });
    },
    /**Devuelve filtro de Mongoose para la fecha indicada.
     * Pensado para recibir un año como paŕametro.
    */
    filtroAnio : function(fecha)
    {
        //var a = new Date(2018,0,1,1,0,0) 
        //a -> Date 2018-01-01T00:00:00.000Z
        //String(a) -> "Mon Jan 01 2018 01:00:00 GMT+0100 (CET)"
        const fechaMin = new Date(String(fecha));
        const fechaMax = new Date(String(fecha+1));
        const filtro = {dia :{$gt: fechaMin, $lt: fechaMax}};
        return filtro;
    }
}

/**FUNCIONES INTERNAS */

/**Recibe los datos de la consulta a la base de datos.
 * Todos los datos están en la misma lista.
 * También recibe como parámetro un objeto vacío, el 
 * cual se empleará como diccionario, almacenando los
 * datos clasificados por año.
 * Los objetos se pasan por referencia, por lo que
 * no hace falta devolver nada ya que la variable 
 * dataDict conservará los cambios.
 */
function clasificarDatosAnio(datos, dataDict)
{
    datos.forEach(element =>
    {
        //Obtengo la fecha (año) de la entrada actual
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
}

/**Procesa los datos en dataDict (contiene los datos en bruto
 * clasificados por año) y los procesa empleando la función
 * 'funcion', la cual será una de las tres medias.
 * Los resultados que se van obteniendo (por año), se van
 * almacenando en resDict (por año).
 * 
 * 'campo' es una cadena que contiene los campos a emplear
 * separados por espacios. Lo normal es que contenga dos,
 * el campo sobre el cual calcular la media y 'dia', ya que
 * tenemos que operar con las fechas. El primer campo que
 * se encuentre en esta cadena es el que se empleará
 * para calcular la media.*/
function procesarDatosAnio(dataDict, resDict, campo, funcion)
{
    //APLICAR FUNCION
    //Itero a través de las 'claves' del diccionario.
    //Cada una de ellas se correspondera con un año
    for (var year in dataDict) {
        if (dataDict.hasOwnProperty(year)) {
            // do stuff
            //la funcion 'funcion' se recibe como parametros.
            //Será una de las tres medias. Recibe como primer 
            //parámetro los datos a utilizar y como segundo el campo
            //de los datos del cual deberá hallar la media.
            //En res tendremos la media del año 'year' y del 
            //primer campo contenido en 'campo'
            var res = funcion(dataDict[year], campo.split(" ")[0])
            console.log("Anio "+year+" : " + res);
            //Añado solucion al objecto que contiene los resultados
            resDict[year] = res;
        }
    }
}

/**Dada la variable (objeto javascript) resMsg que será el mensaje a 
 * devolver y resDict que es otro objecto (~diccionario) que contiene
 * los datos de la respuesta, metemos los datos de esta última variable
 * en el mensaje de respuesta de forma que lo entienda el front-end.
 * En 'label' meteremos los datos del eje X (~leyenda) y en 'data'
 * los datos obtenidos de realizar las operaciones (eje Y).
 * 
 * 'campo' y 'funcion' se emplean para crear la descripcion.
 * 
 * 'filtro' se emplea por si el mensaje que se va a enviar esta vacio, saber
 * de que año se ha pedido calcular la media.
 */
function rellenarMensajeRespuesta(resMsg, resDict, campo, filtro, funcion)
{
    resMsg['label'] = [];
    resMsg['data'] = [];
    for (var key in resDict) {
        if (resDict.hasOwnProperty(key)) {
            // do stuff
            resMsg['label'].push(key);
            resMsg['data'].push(resDict[key]);
        }
    }
    //Compruebo si el mensaje esta vacio
    if(resMsg['label'].length == 0
        && resMsg['data'].length == 0)
    {
        //Intento obtener año solicitado de la variable 'filtro'
        //const filtro = {dia :{$gt: fechaMin, $lt: fechaMax}};
        resMsg['label'].push(filtro['dia']['$gt'].getFullYear());
        resMsg['data'].push(null);
    }
    //Añado descripcion
    resMsg["descr"] = String(funcion).split(/[ (]/)[1]
    +" "+campo.split(" ")[0]
    +" por Año" ;
}