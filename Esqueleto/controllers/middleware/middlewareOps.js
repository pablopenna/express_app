var path = require('path');
//Necesitan utilizar las funciones en controllers/ops/filtros/filtroOps.js
//para, a partir del año y/o mes especificado, generar el filtro adecuado.
filtroOps = require(path.resolve(__dirname, path.join(process.cwd(),
'controllers', 'ops', 'filtros', 'filtroOps.js')));

module.exports = 
{
    initFiltro: function(req, res, next) {
        //Inicializo la variable filtro
        res.locals.filtro = {};
        res.locals.filtro1 = 'inicializado';
        next();
    },
    genFiltroAnio: function(req, res, next) {
        console.log("MIDDLE: " + req.params.tipoMedia);
        console.log("MIDDLE: " + req.params.Anio);
        //Obtengo año especificado por cliente.
        //Si no se ha especificado año, no modificare
        //la variable res.locals.filtro, la cual
        //ya esta inicializada por el middleware anterior.
        res.locals.userYear = req.params.Anio;
        if(res.locals.userYear != undefined 
            && !isNaN(parseInt(res.locals.userYear)))
        {
            res.locals.filtro = filtroOps.filtroAnio(parseInt(res.locals.userYear));
        }
        next();
    },
    genFiltroMes: function(req, res, next) {
        console.log("MIDDLE - op: " + req.params.tipoMedia);
        console.log("MIDDLE - año: " + req.params.Anio);
        console.log("MIDDLE - mes: " + req.params.Mes);
        //Obtengo año especificado por cliente.
        //Si no se ha especificado año, no modificare
        //la variable res.locals.filtro, la cual
        //ya esta inicializada por el middleware anterior.
        res.locals.userMonth = req.params.Mes;
        //Año
        res.locals.userYear = req.params.Anio;
        if(res.locals.userMonth != undefined 
            && !isNaN(parseInt(res.locals.userMonth))
            && res.locals.userYear != undefined 
            && !isNaN(parseInt(res.locals.userYear)))
        {
            res.locals.filtro = filtroOps.filtroMes(
                parseInt(res.locals.userMonth),
                parseInt(res.locals.userYear));
        }
        next();
    }
}