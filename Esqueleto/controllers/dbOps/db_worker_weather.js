//var MiModelo = require('../models/weather.js');
var path = require('path');
var MiModelo = require(path.resolve(__dirname, path.join(process.cwd(), 'models', 'weather.js')));

//exporto la instancia router con las rutas y los
//métodos definidors. Importaremos esta intancia en
//router.js para emplearla en la aplicación.
module.exports = {

    /* Get data from DB */
    /*Desde terminal:
    curl -X GET localhost:3000/db
    */
    getData : function(req,res,next)
    {
        MiModelo.find({}).sort({dia: 1}).exec(function(err, datos)
        {
            //console.log('RESULTADO: ' + datos);
            if (err)
            {
                console.log("ERROR: " + err);
                res.send(err);
                return err;
            }
            //Respuesta
            res.json(datos);
        });
    },

    /* Post data to DB */
    /*Desde terminal:
    curl -i -X POST -H "Content-Type: appjson" 
        -d '{"temp.media":50}' localhost:3000/weather    */
    setData : function(req,res,next)
    {
        MiModelo.create(req.body, function(err, datos)
        {
            //console.log('RESULTADO: ' + datos);
            if (err)
            {
                console.log("ERROR: " + err);
                res.send(err);
                return err;
            }
            //Respuesta
            res.json(datos);
        });
    },

    /* Borra todos los datos */
    /* curl -X DELETE localhost:3000/db */

    clearData : function(req, res)
    {
        MiModelo.remove().exec(function(err, datos)
        {
            //console.log('RESULTADO: ' + datos);
            if (err)
            {
                console.log("ERROR: " + err);
                if(res!=undefined)
                {
                    res.send(err);
                }
                return err;
            }
            //Respuesta
            if(res!=undefined)
            {
                res.json(datos);
            }
        })
    }
};