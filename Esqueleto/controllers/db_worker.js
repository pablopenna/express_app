var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MiModelo = require('../models/model_test.js');

/* Get data from DB*/
//Le añado prefijo al llamarlo desde router.js
router.get('/', function(req,res,next)
{
    MiModelo.find(function(err, resultado)
    {
        if (err)
        {
            console.log("ERROR: " + err);
            return err;
        }
        res.json(resultado);
    });
}); 

/* Post data to DB */
router.post('/', function(req,res,next)
{
    MiModelo.create(req.body, function(err, post)
    {
        if (err)
        {
            console.log("ERROR: " + err);
            return err;
        }
        res.json(post);
    })
});