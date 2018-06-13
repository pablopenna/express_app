//var express = require('express');
var MiModelo = require('../models/weather.js');

//exporto la instancia router con las rutas y los
//métodos definidors. Importaremos esta intancia en
//router.js para emplearla en la aplicación.
module.exports = {
    //Get data in the DB. Devuelve objeto Promise.
    getAllData : async function() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
        const datos = await MiModelo.find().exec();

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        const miLista = datos.map(dato => dato.numero)

        return miLista;
    },

    /* Get data from DB */
    /*Desde terminal:
    curl -X GET localhost:3000/db
    */
    //Le añado prefijo al llamarlo desde router.js
    getData : function(req,res,next)
    {
        MiModelo.find().exec(function(err, datos)
        {
            console.log('RESULTADO: ' + datos);
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
            console.log('RESULTADO: ' + datos);
            if (err)
            {
                console.log("ERROR: " + err);
                res.send(err);
                return err;
            }
            //Respuesta
            res.json(datos);
        })
    },

    /* Borra todos los datos */
    /* curl -X DELETE localhost:3000/db */

    clearData : function(req, res)
    {
        MiModelo.remove().exec(function(err, datos)
        {
            console.log('RESULTADO: ' + datos);
            if (err)
            {
                console.log("ERROR: " + err);
                res.send(err);
                return err;
            }
            //Respuesta
            res.json(datos);
        })
    },

    /*TEMPLATE*/
    //Al utilizar la funcion asincrona getAllData(),
    //esta funcion que la llama tambien debe ser asyncrona
    //para esperar por el resultado.
    renderDBTemplate : async function(req,res,next)
    {
        var datos = await getAllData();
        console.log("THE TRUE TEST: <" + datos + ">");
        
        res.render('test/dbtest.html');
    }
};