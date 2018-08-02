module.exports={
    /**Recibe los datos de la consulta a la base de datos.
     * Todos los datos están en la misma lista.
     * 
     * También recibe como parámetro un objeto vacío, el 
     * cual se empleará como diccionario, almacenando los
     * datos clasificados por año.
     * 
     * Los objetos se pasan por referencia, por lo que
     * no hace falta devolver nada ya que la variable 
     * dataDict conservará los cambios.
     * 
     * 'getTimeUnit' es una funcion que se emplea para,
     * dada una entrada de los datos, obtener la unidad de tiempo.
     */
    clasificarDatosTiempo: function clasificarDatosTiempo(datos, dataDict,getTimeUnit)
    {
        datos.forEach(element =>
        {
            //Obtengo la fecha (año) de la entrada actual
            var unidadTiempoActual = getTimeUnit(element);
            //Si no hay datos todavia para ese año creo lista
            if(dataDict[unidadTiempoActual]==undefined)
            {
                dataDict[unidadTiempoActual] = [];
            }
            //añado datos de la entrada actual a la lista
            //para el año en el que etan registrados los datos
            dataDict[unidadTiempoActual].push(element);
        });
    },

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
    procesarDatosTiempo: function procesarDatosTiempo(dataDict, resDict, campo, funcion)
    {
        //APLICAR FUNCION
        //Itero a través de las 'claves' del diccionario.
        //Cada una de ellas se correspondera con un año
        for (var timeUnit in dataDict) {
            if (dataDict.hasOwnProperty(timeUnit)) {
                // do stuff
                //la funcion 'funcion' se recibe como parametros.
                //Será una de las tres medias. Recibe como primer 
                //parámetro los datos a utilizar y como segundo el campo
                //de los datos del cual deberá hallar la media.
                //En res tendremos la media del año 'timeUnit' y del 
                //primer campo contenido en 'campo'
                var res = funcion(dataDict[timeUnit], campo.split(" ")[0])
                console.log("Unidad Tiempo "+timeUnit+" : " + res);
                //Añado solucion al objecto que contiene los resultados
                resDict[timeUnit] = res;
            }
        }
    },

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
     * 
     * 'rellenarSiVacio' es una función que se empleará si no hay resultados,
     * para evitar que el mensaje de respuesta esté vacío. Se encargará de meter
     * las labels apropiadas. Como valores de las operaciones metará 'null'.
     * 
     * 'timeUnit' es una cadena que indica la unidad de tiempo. P.ej: 'mes', 'dia', 'semana'...
     */
    rellenarMensajeRespuesta: function rellenarMensajeRespuesta(resMsg, resDict,
        campo, filtro, funcion, timeUnit)
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
            console.log("RESPUESTA VACIA. unidad tiempo: " + timeUnit);
        }
        //Añado descripcion
        resMsg["descr"] = String(funcion).split(/[ (]/)[1]
        +" "+campo.split(" ")[0]
        +" por " + timeUnit;
    }
}