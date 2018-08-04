var path = require('path');
//Necesitan utilizar las funciones en controllers/meta/generarFiltros.js
//para, a partir del año y/o mes especificado, generar el filtro adecuado.
crearFiltro = require(path.resolve(__dirname, path.join(process.cwd(),
'controllers', 'meta', 'generarFiltros.js')));

/**
 * En este fichero js se encuentran las funciones a emplear por el middleware.
 * 
 * Estas funciones recopilarán la información de la 'query string' de la 
 * URL (...?var1=10&var2=0).
 * 
 * En este caso, las únicas variables de las que se tomará valor serán
 * 'anio' y 'mes'. Si el cliente especifica el valor de estas variables
 * en la 'query string' de la url.
 * 
 * P.ej: '/meta/mes/media/temp?anio=2015'. Tomará el valor 2015 de la var 'anio' y
 * empleará las funciones definidas en controllers/meta/generarFiltros.js para
 * crear un filtro para ese año.
 * 
 * El filtro generado se emplea a la hora de realizar la consulta a la base de datos,
 * de forma que nos devuelva datos sólo para el período especificado.
 * 
 * 
 */

 //UNUSED
function initFiltro(req, res, next) {
    //Inicializo la variable filtro
    res.locals.filtro = {};
    res.locals.filtro1 = 'inicializado';
    next();
}

//UNUSED
function genFiltroAnio(req, res, next) {
    console.log("MIDDLE: ?anio: " + req.query.anio);
    //Obtengo año especificado por cliente.
    //Si no se ha especificado año, no modificare
    //la variable res.locals.filtro, la cual
    //ya esta inicializada por el middleware anterior.
    res.locals.userYear = req.query.anio;
    if(res.locals.userYear != undefined 
        && !isNaN(parseInt(res.locals.userYear)))
    {
        res.locals.filtro = crearFiltro.filtroAnio(parseInt(res.locals.userYear));
    }
    next();
}

//UNUSED
function genFiltroMes(req, res, next) {
    console.log("MIDDLE: ?anio: " + req.query.anio);
    console.log("MIDDLE: ?mes: " + req.query.mes);
    //Obtengo año especificado por cliente.
    //Si no se ha especificado año, no modificare
    //la variable res.locals.filtro, la cual
    //ya esta inicializada por el middleware anterior.
    res.locals.userMonth = req.query.mes;
    //Año
    res.locals.userYear = req.query.anio;
    if(res.locals.userMonth != undefined 
        && !isNaN(parseInt(res.locals.userMonth))
        && res.locals.userYear != undefined 
        && !isNaN(parseInt(res.locals.userYear)))
    {
        res.locals.filtro = crearFiltro.filtroMes(
            parseInt(res.locals.userMonth),
            parseInt(res.locals.userYear));
    }
    next();
}

/**Obtiene parametros de la URL y genera filtro
 * conforme a ellos.
 * Esta funcion no requiere de la operacion initFiltro
 * ya que inicializa el filtro por su cuenta
 */
function genFiltroDefinitivo(req, res, next) {

    //Inicializo filtro. Se quedara con este valor
    //en caso de que el usuario no especifique ningun
    //mes o año.
    res.locals.filtro = {};

    //DEBUG
    console.log("MIDDLE: ?anio: " + req.query.anio);
    console.log("MIDDLE: ?mes: " + req.query.mes);

    //Obtengo año especificado por cliente.
    //Si no se ha especificado año, no modificare
    //la variable res.locals.filtro, la cual
    //ya esta inicializada por el middleware anterior.
    res.locals.userMonth = req.query.mes;
    //Año
    res.locals.userYear = req.query.anio;

    //Si se ha especificado año...
    if(res.locals.userYear != undefined 
        && !isNaN(parseInt(res.locals.userYear)))
    {
        //Si se ha especificado mes, calculare
        //resultados para el mes del año especificado
        if(res.locals.userMonth != undefined 
            && !isNaN(parseInt(res.locals.userMonth)))
            
        {
            res.locals.filtro = crearFiltro.filtroMes(
                parseInt(res.locals.userMonth),
                parseInt(res.locals.userYear));
        }
        //Si no se ha especificado mes, calculo
        //resultados para el año indicado
        else
        {
            res.locals.filtro = crearFiltro.filtroAnio(
                parseInt(res.locals.userYear));
        }
    }

    //Paso a siguiente funcion. Obligatorio al ser middleware.
    next();
}


module.exports = 
{
    initFiltro: initFiltro,
    genFiltroAnio: genFiltroAnio,
    genFiltroMes: genFiltroMes,
    genFiltro: genFiltroDefinitivo,

    /**Funcion que engloba a las anteriores.
     * 
     * Será la que se llame como middleware.
     * 
     * No se emplea ya que hace asincrono, y se ejecuta a
     * la vez que los cálculos de la media. Por esto, da error
     * al intentar cambiar el header porque ya se ha enviado.
     * 
     * Es más sencillo añadir las diferentes funciones
     * como middleware.
     */
    getUserFilter: function(req, res, next)
    {
        initFiltro(req,res,next);
        genFiltroAnio(req,res,next);
        genFiltroMes(req,res,next);
    }
}