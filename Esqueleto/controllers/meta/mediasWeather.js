/**Módulo para el cálculo de las diferentes medias climáticas.
 * 
 * No es más que una interfaz para llamar a las funciones matemáticas
 * en mediasMath.js tras haber parseado los datos.
 * 
 * Las funciones de deste módulo recibirán los datos retornados por
 * la base de datos directamente, es decir, en formato JSON.
 * Esto junto con el campo del que se debe calcular la media.
 * 
 * Los valores numéricos se extraerán de los datos en JSON y se
 * introducirán en una lista. Esta lista es la que le pasaremos a
 * las funciones de las librerías matemáticas para obtener el resultado.
 */
var path = require('path');
var ModeloClima = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));

//Modulo con medias matematicas
var mediasMath = require(path.resolve(__dirname, path.join(process.cwd(),
'controllers', 'meta', 'mediasMath.js')));

module.exports = {
    /**Recibe los datos de la base de datos como parámetro
     * y los emplea para calcular la media del campo
     * especificado como parámetro.
     * Como campo recibirá uno de los campos de la
     * base de datos:
     * ['dia','probLluvia','precipitaciones',
     * 'humedad','velViento','temp','presion']
     */
    mediaWeather : function mediaWeather(datos, campo)
    {
        //datos es un array con los objetos retornados por find
        //res.send(datos);
        //Los datos en 'datos' están en JSON.
        //Los extraremos y les aplicaremos la funcion media()
        var listaDatos = [];
        datos.forEach( element => {
            console.log("ELEMENTO["+campo+"]: " + element[campo]);
            listaDatos.push(element[campo]);
        });
        
        //Obtengo media de los datos almacenados en la lista
        var resultado = mediasMath.media(listaDatos);
        console.log("MEDIAWEATHER: " + resultado);
        return resultado;
    },

    /**Recibe los datos de la base de datos como parámetro
     * y los emplea para calcular la media armónica del campo
     * especificado.
     */
    mediaArmonicaWeather: function mediaArmonicaWeather(datos, campo)
    {
        //datos es un array con los objetos retornados por find
        //res.send(datos);
        //Los datos en 'datos' están en JSON.
        //Los extraremos y les aplicaremos la funcion media()
        var listaDatos = [];
        datos.forEach( element => {
            console.log("ELEMENTO["+campo+"]: " + element[campo]);
            listaDatos.push(element[campo]);
        });

        //Obtengo media de los datos almacenados en la lista
        var resultado = mediasMath.mediaArmonica(listaDatos);
        console.log("MEDIAARMWEATHER: " + resultado);
        return resultado;
    },

    /**Recibe los datos de la base de datos como parámetro
     * y los emplea para calcular la media geométrica del campo
     * especificado.
     */
    mediaGeometricaWeather: function mediaGeometricaWeather(datos, campo)
    {
        //datos es un array con los objetos retornados por find
        //res.send(datos);
        //Los datos en 'datos' están en JSON.
        //Los extraremos y les aplicaremos la funcion media()
        var listaDatos = [];
        datos.forEach( element => {
            console.log("ELEMENTO["+campo+"]: " + element[campo]);
            listaDatos.push(element[campo]);
        });

        //Obtengo media de los datos almacenados en la lista
        var resultado = mediasMath.mediaGeometrica(listaDatos);
        console.log("MEDIAGEOWEATHER: " + resultado);
        return resultado;
    }
};