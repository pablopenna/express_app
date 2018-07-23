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



module.exports = {
    /**Recibe los datos de la base de datos como parámetro
     * y los emplea para calcular la media del campo
     * especificado como parámetro.
     * Como campo recibirá uno de los campos de la
     * base de datos:
     * ['dia','probLluvia','precipitaciones',
     * 'humedad','velViento','temp','presion']
     */
    mediaWeather : function media(datos, campo)
    {
        //datos es un array con los objetos retornados por find
        //res.send(datos);
        //MEDIA
        var sumatorio = 0;
        var numElementos = 0;
        datos.forEach( element => {
            console.log("ELEMENTO["+campo+"]: " + element[campo]);
            sumatorio += element[campo];
            numElementos++;
        });
        console.log("LONG: " + numElementos);
        var media = sumatorio/numElementos;
        //meto la media en un json
        //var resultado = {"label" : "Media " + campo,"data" : media};
        var resultado = media;
        console.log("INNER_MEDIA: " + resultado);
        return resultado;
    },

    /**Recibe los datos de la base de datos como parámetro
     * y los emeplea para calcular la media armónica del campo
     * 'probLluvia'.
     */
    mediaArmonicaWeather: function mediaArmonica(datos, campo)
    {
        //datos es un array con los objetos retornados por find
        //res.send(datos);
        //MEDIA ARMONICA = numElementos/( (1/elem1) + (1/elem2) + ... + (1/elemN) )
        var sumatorio = 0;
        var numElementos = 0;
        datos.forEach( element => {
            console.log("ELEMENTO["+campo+"]: " + element[campo]);
            //Si el numero actual es 0, dividire entre 0
            //y dará infinito. Para evitar esto, si
            //el valor actual es 0, lo ignoraremos.
            //La media armonica no puede calcularse para valores
            //negativos, por lo que ignoreremos estos ultimos
            if(element[campo] > 0)
            {
                sumatorio += 1/element[campo];
                numElementos++;
            }
        });
        console.log("LONG: " + numElementos);
        console.log("DIV: " + sumatorio);
        var media = numElementos/sumatorio;
        //meto la media en un json
        //var resultado = {"label" : "Media Armonica "+campo,"data" : media};
        var resultado = media;
        console.log("INNER_MEDIA_AMONICA: " + resultado);
        return resultado;
    },

    /**Recibe los datos de la base de datos como parámetro
     * y los emeplea para calcular la media geométrica del campo
     * 'probLluvia'.
     */
    mediaGeometricaWeather: function mediaGeometrica(datos, campo)
    {
        //datos es un array con los objetos retornados por find
        //res.send(datos);
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
            console.log("ELEMENTO["+campo+"]: " + element[campo]);
            //Si el numero actual es 0, multiplicare por 0
            //y la media sera 0 ya que al multiplicar
            //el resto de elementos por 0 seguira siendo 0.
            //Para evitar esto, si el valor actual es 0, lo ignoraremos.

            //Tampoco puede calcularse para valores negativos, por lo
            //que los ignoraremos. (Los logaritmos no pued aplicarse a numeros negativos)
            if(element[campo] > 0)
            {
                sumatorio += Math.log10(element[campo]);
                numElementos++;
                console.log("PROD.GEO: " + sumatorio);
            }
        });
        //8^(1/3) = 10 ^ (log(8)/3)
        console.log("LONG: " + numElementos);
        console.log("SUMA: " + sumatorio);
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
        var media = Math.pow(10, logMedia);
        //meto la media en un json
        //var resultado = {"label" : "Media Geometrica "+campo,"data" : media};
        var resultado = media;
        console.log("INNER_MEDIA_GEOMETRICA: " + resultado);
        return resultado;
    }
};