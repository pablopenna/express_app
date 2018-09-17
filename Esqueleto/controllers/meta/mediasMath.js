/**Módulo con las funciones matemáticas de las medias a calcular.
 * Las funciones reciben una lista con los diferentes datos numéricos 
 * y hallan la media del tipo que sea de los datos proporcionados.
 */

module.exports = {

    /*Dado un array 'datos' con valores numéricos, halla la media aritmética de los mismos.*/
    media: function media(datos)
    {
        //'datos' es un array con los valores numericos
        //a emplear para calcular la media
        //MEDIA
        var sumatorio = 0;
        var numElementos = 0;
        datos.forEach( element => {
            sumatorio += element;
            numElementos++;
        });
        console.log("LONG: " + numElementos);
        var media = sumatorio/numElementos;
        //meto la media en un json
        //var resultado = {"label" : "Media " + campo,"data" : media};
        //redondeo dos decimales
        var resultado = Math.round(media * 100)/100;
        console.log("MEDIA: " + resultado);
        return resultado;
    },

    /*Dado un array 'datos' con valores numéricos, halla la media Armónica de los mismos.*/
    mediaArmonica: function mediaArmonica(datos)
    {
        //'datos' es un array con los valores numericos
        //a emplear para calcular la media armónica
        //MEDIA ARMONICA = numElementos/( (1/elem1) + (1/elem2) + ... + (1/elemN) )
        var sumatorio = 0;
        var numElementos = 0;
        datos.forEach( element => {
            //Si el numero actual es 0, dividire entre 0
            //y dará infinito. Para evitar esto, si
            //el valor actual es 0, lo ignoraremos.
            //La media armonica no puede calcularse para valores
            //negativos, por lo que ignoreremos estos ultimos
            if(element > 0)
            {
                sumatorio += 1/element;
                numElementos++;
            }
        });
        //console.log("MEDIARM_LONG: " + numElementos);
        //console.log("DIV: " + sumatorio);
        var mediaArm = numElementos/sumatorio;
        //meto la media en un json
        //var resultado = {"label" : "Media Armonica "+campo,"data" : media};
        //redondeo dos decimales
        var resultado = Math.round(mediaArm * 100)/100;
        console.log("MEDIA_ARMONICA: " + resultado);
        return resultado;
    },

    mediaGeometrica: function mediaGeometrica(datos)
    {
        //'datos' es un array con los valores numericos
        //a emplear para calcular la media geométrica
        //MEDIA GEOMETRICA = (elem1*elem2*...*elemN)^(1/N)

        //HAY que utilizar logaritmos para no hacer overflow
        /**
         * Op.A -> 17 * 14 = 238 (OVERFLOW si producto muy grande).
         * Op.b ->
         * log(17) + log(14) = x
         * 10 ^ x = 238
         * (manejamos numeros mas pequeños)
         */
        //Sumatorio de los valores de los logaritmos
        var sumatorio = 0;
        var numElementos = 0;
        datos.forEach( element => {
            //Si el numero actual es 0, multiplicare por 0
            //y la media sera 0 ya que al multiplicar
            //el resto de elementos por 0 seguira siendo 0.
            //Para evitar esto, si el valor actual es 0, lo ignoraremos.

            //Tampoco puede calcularse para valores negativos, por lo
            //que los ignoraremos. (Los logaritmos no pueden aplicarse a numeros negativos)
            if(element > 0)
            {
                sumatorio += Math.log10(element);
                numElementos++;
                //console.log("PROD.GEO: " + sumatorio);
            }
        });
        //8^(1/3) = 10 ^ (log(8)/3)
        console.log("MEDIA_GEO_LONG: " + numElementos);
        console.log("MEDIA_GEO_SUMA: " + sumatorio);
        //Calculo logaritmo de la media.
        //media geo = (n1*n2*..*ni)^(1/i)
        //i = numElementos
        //n1*n2*...ni = log(n1) + log(n2) + ... +log (ni)
        //(n1*n2*..*ni)^(1/i) = (log(n1) + log(n2) + ... +log (ni))/i
        //sumatorio = log(n1) + log(n2) + ... +log (ni) ->
        //(n1*n2*..*ni)^(1/i) = 10^(sumatorio/i)
        //media geo = 10^(sumatorio/numElementos)
        var logMedia = sumatorio/numElementos;
        console.log("MUL: " + logMedia);
        var mediaGeo = Math.pow(10, logMedia);

        //redondeo dos decimales
        var resultado = Math.round(mediaGeo * 100)/100;
        console.log("MEDIA_GEOMETRICA: " + resultado);
        return resultado;
    }

};

