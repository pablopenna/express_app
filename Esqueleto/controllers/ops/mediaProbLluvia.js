/**Media de la probabilidad de lluvia () */
var path = require('path');
var ModeloClima = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));

module.exports = {
    mediaLluvia : function(req, res)
    {
        ModeloClima
        //.find({probLluvia : {$gt : 20, $lt :80}})
        .find()
        .select({_id : 0, probLluvia : 1})
        .exec(function(err,datos)
        {
            if (err)
            {
                console.log("ERROR: " + err);
                res.send(err);
                return err;
            }
            console.log("DATOS: " + datos);
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
            var resultado = {"mediaProbLluvia" : media};
            res.send(resultado);
        });
    }
};