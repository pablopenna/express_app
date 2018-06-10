var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MiModelo = require('../models/model_test.js');

/* Get data from DB */
/*Desde terminal:
curl -X GET localhost:3000/db
*/
//Le añado prefijo al llamarlo desde router.js
router.get('/', function(req,res,next)
{
    MiModelo.find(function(err, datos)
    {
        console.log('RESULTADO: ' + datos);
        if (err)
        {
            console.log("ERROR: " + err);
            return err;
        }
        //Respuesta
        res.json(datos);
    });
}); 

/* Post data to DB */
/*Desde terminal:
curl -i -X POST -H "Content-Type: application/json" -d '{"numero":"cuatro","cadena":"cuarta variable"}' localhost:3000/db
*/
router.post('/', function(req,res,next)
{
    MiModelo.create(req.body, function(err, datos)
    {
        console.log('RESULTADO: ' + datos);
        if (err)
        {
            console.log("ERROR: " + err);
            return err;
        }
        //Respuesta
        res.json(datos);
    })
});

/*TEMPLATE*/
router.get('/render', function(req,res,next)
{
    var datos = getAllData();
    console.log("THE TRUE TEST: <" + datos + ">");
    res.render('test/dbtest.html');
}); 


//Get data in the DB
function getAllData()
{
    //Funciona ya que con require('mongoose')
    //obtengo el objeto que se ha estado 
    //utilzando previamente en la aplicacion,
    //por lo que la conexion ya esta inicializada
    var db = mongoose.connection;
    //---
    
    var promesa = MiModelo.find().exec();
    console.log(promesa);
    console.log("---");
    var miLista=[];
    async = require('async');
    //
    async.parallel([function(){
        promesa.then(function(datos)
        {
            datos.forEach(function(dato){
                console.log("dato: " + dato.numero)
                miLista.push(dato.numero);
            });
        });
    }],function(){
        console.log(miLista);
    });
    //
    return miLista;
}

//exporto la instancia router con las rutas y los
//métodos definidors. Importaremos esta intancia en
//router.js para emplearla en la aplicación.
module.exports = router;