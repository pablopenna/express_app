//elementos basicos
var path = require('path');
var app = require(path.join(process.cwd(), 'server'));
var fs = require('fs');
var glob = require('glob');

//CORS
var cors = require('cors')
//---

//este es el proceso encargado de establecer los controladores y asignarlos a su carpeta
var controllers = {};
var files = glob.sync(path.join(process.cwd(), 'controllers', '**', '*.js'));

//DEBUG
//console.log("FILES: " + files);

files.forEach(function (file) {
    var temp = controllers;
    //console.log("temp: " + temp);
    var parts = path.relative(path.join(process.cwd(), 'controllers'), file).slice(0, -3).split(path.sep);
    //console.log("parts: " + parts);

    while (parts.length) {
        if (parts.length === 1) {
            temp[parts[0]] = require(file);
        } else {
            temp[parts[0]] = temp[parts[0]] || {};
        }
        temp = temp[parts.shift()];
    }
});
//DEBUG
/*
for (i in controllers)
{
    console.log("CONTROLLER " + i + ": " + controllers[i]);
}
console.log("WIKI: " + controllers.db_worker);
console.log("WIKI.HOME: " + controllers.db_worker.getData);
console.log("WIKI.ABOUT: " + controllers.db_worker.setData);
*/

//Proceso para asociar las peticiones a los métodos del controlador
module.exports = function () {
    //añadimos el index
    //app.route('/').get(controllers.main.main);
    
    /*Podemos asignar tantas rutas como queramos, incluyendo parámetros, middleware y todo lo que Express soporte.Algunos ejemplos:
    app.route('/:id').get(controllers.users.show);
    app.route('/admin').get(auth.check, controllers.admin.main);
    app.route('/admin/edit/:id').get(auth.check, controllers.admin.edit);*/
    
    /*Pruebas*/
    //CORS
    app.use(cors());
    /*Lo aceptable.*/
    app.route('/').get(controllers.main_menu.menu);
    app.route('/home').get(controllers.wiki.home);
    app.route('/about').get(controllers.wiki.about);
    app.route('/test').get(controllers.test.testFunc);
    app.route('/ang').get(controllers.test.testAng);
    //No funciona. testFunc2() no esta declarado (undefined)
    //app.route('/test2').get(controllers.test.testFunc2);

    //DB
    app.route('/db').get(controllers.db_worker.getData);
    //app.route('/db').post(controllers.db_worker.setData);
    //app.route('/db/render').get(controllers.db_worker.renderDBTemplate);

    app.route('/weather').get(controllers.db_worker_weather.getData);
    app.route('/weather').post(controllers.db_worker_weather.setData);
    app.route('/weather').delete(controllers.db_worker_weather.clearData);
    //
    //GET -> Accesible a través del navegador. PRUEBA.
    app.route('/reset').get(controllers.db_weather_filler.resetDB);
    //POST -> Accesible a través de la aplicacion.
    app.route('/reset').post(controllers.db_weather_filler.resetDB);
    //---
    //OPERACIONES
    //Accesible desde navegador
    app.route('/ops/mediaLluvia').get(controllers.ops.mediaProbLluvia.mediaLluvia);
    //Accesible mediante POST
    /**MEDIAS ABSOLUTAS*/
    //Probabilidad de lluvia
    app.route('/ops/mediaLluvia').post(controllers.ops.mediaProbLluvia.mediaLluvia);
    app.route('/ops/mediaArmLluvia').post(controllers.ops.mediaProbLluvia.mediaArmLluvia);
    app.route('/ops/mediaGeoLluvia').post(controllers.ops.mediaProbLluvia.mediaGeoLluvia);
    app.route('/ops/newMediaLluvia').post(controllers.ops.mediaProbLluvia.newMediaLluvia);
    app.route('/ops/newMediaArmLluvia').post(controllers.ops.mediaProbLluvia.newMediaArmLluvia);
    app.route('/ops/newMediaGeoLluvia').post(controllers.ops.mediaProbLluvia.newMediaGeoLluvia);

    //Precipitaciones
    app.route('/ops/mediaPrecipitaciones').post(controllers.ops.mediasPrecipitaciones.mediaPrecipitaciones);
    app.route('/ops/mediaArmPrecipitaciones').post(controllers.ops.mediasPrecipitaciones.mediaArmPrecipitaciones);
    app.route('/ops/mediaGeoPrecipitaciones').post(controllers.ops.mediasPrecipitaciones.mediaGeoPrecipitaciones);

    //Humedad relativa
    app.route('/ops/mediaHumedad').post(controllers.ops.mediasHumedad.mediaHumedad);
    app.route('/ops/mediaArmHumedad').post(controllers.ops.mediasHumedad.mediaArmHumedad);
    app.route('/ops/mediaGeoHumedad').post(controllers.ops.mediasHumedad.mediaGeoHumedad);

    //Presion
    app.route('/ops/mediaPresion').post(controllers.ops.mediasPresion.mediaPresion);
    app.route('/ops/mediaArmPresion').post(controllers.ops.mediasPresion.mediaArmPresion);
    app.route('/ops/mediaGeoPresion').post(controllers.ops.mediasPresion.mediaGeoPresion);

    //Temperatura
    app.route('/ops/mediaTemp').post(controllers.ops.mediasTemp.mediaTemp);
    app.route('/ops/mediaArmTemp').post(controllers.ops.mediasTemp.mediaArmTemp);
    app.route('/ops/mediaGeoTemp').post(controllers.ops.mediasTemp.mediaGeoTemp);

    //Velocidad Viento
    app.route('/ops/mediaVelViento').post(controllers.ops.mediasVelViento.mediaVelViento);
    app.route('/ops/mediaArmVelViento').post(controllers.ops.mediasVelViento.mediaArmVelViento);
    app.route('/ops/mediaGeoVelViento').post(controllers.ops.mediasVelViento.mediaGeoVelViento);

    /**MEDIAS X AÑO */
    //Operaciones filtros
    var filtroOps = require(path.resolve(__dirname, path.join(process.cwd(),
        'controllers', 'ops', 'filtros', 'filtroOps')));
    //Inicializar filtro
    app.use(function(req, res, next) {
        //Inicializo la variable filtro
        res.locals.filtro = {};
        next();
    });
    //Obtener AÑO de la URL
    app.use('/ops/anio/:tipoMedia/:Anio',function(req, res, next) {
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
    });
    //Probabilidad Lluvia
    app.route('/ops/anio/mediaProbLluvia').post(controllers.ops.anio.mediasAnioProbLluvia.mediaProbLluviaAnio);
    app.route('/ops/anio/mediaArmProbLluvia').post(controllers.ops.anio.mediasAnioProbLluvia.mediaArmProbLluviaAnio);
    app.route('/ops/anio/mediaGeoProbLluvia').post(controllers.ops.anio.mediasAnioProbLluvia.mediaGeoProbLluviaAnio);
    app.route('/ops/anio/mediaProbLluvia/:Anio').post(controllers.ops.anio.mediasAnioProbLluvia.mediaProbLluviaAnio);
    app.route('/ops/anio/mediaArmProbLluvia/:Anio').post(controllers.ops.anio.mediasAnioProbLluvia.mediaArmProbLluviaAnio);
    app.route('/ops/anio/mediaGeoProbLluvia/:Anio').post(controllers.ops.anio.mediasAnioProbLluvia.mediaGeoProbLluviaAnio);
    
    //Precipitaciones
    app.route('/ops/anio/mediaPrecipitaciones').post(controllers.ops.anio.mediasAnioPrecipitaciones.mediaPrecipitacionesAnio);
    app.route('/ops/anio/mediaArmPrecipitaciones').post(controllers.ops.anio.mediasAnioPrecipitaciones.mediaArmPrecipitacionesAnio);
    app.route('/ops/anio/mediaGeoPrecipitaciones').post(controllers.ops.anio.mediasAnioPrecipitaciones.mediaGeoPrecipitacionesAnio);
    app.route('/ops/anio/mediaPrecipitaciones/:Anio').post(controllers.ops.anio.mediasAnioPrecipitaciones.mediaPrecipitacionesAnio);
    app.route('/ops/anio/mediaArmPrecipitaciones/:Anio').post(controllers.ops.anio.mediasAnioPrecipitaciones.mediaArmPrecipitacionesAnio);
    app.route('/ops/anio/mediaGeoPrecipitaciones/:Anio').post(controllers.ops.anio.mediasAnioPrecipitaciones.mediaGeoPrecipitacionesAnio);
    //Humedad relativa
    app.route('/ops/anio/mediaHumedad').post(controllers.ops.anio.mediasAnioHumedad.mediaHumedadAnio);
    app.route('/ops/anio/mediaArmHumedad').post(controllers.ops.anio.mediasAnioHumedad.mediaArmHumedadAnio);
    app.route('/ops/anio/mediaGeoHumedad').post(controllers.ops.anio.mediasAnioHumedad.mediaGeoHumedadAnio);
    app.route('/ops/anio/mediaHumedad/:Anio').post(controllers.ops.anio.mediasAnioHumedad.mediaHumedadAnio);
    app.route('/ops/anio/mediaArmHumedad/:Anio').post(controllers.ops.anio.mediasAnioHumedad.mediaArmHumedadAnio);
    app.route('/ops/anio/mediaGeoHumedad/:Anio').post(controllers.ops.anio.mediasAnioHumedad.mediaGeoHumedadAnio);
    //Presion
    app.route('/ops/anio/mediaPresion').post(controllers.ops.anio.mediasAnioPresion.mediaPresionAnio);
    app.route('/ops/anio/mediaArmPresion').post(controllers.ops.anio.mediasAnioPresion.mediaArmPresionAnio);
    app.route('/ops/anio/mediaGeoPresion').post(controllers.ops.anio.mediasAnioPresion.mediaGeoPresionAnio);
    app.route('/ops/anio/mediaPresion/:Anio').post(controllers.ops.anio.mediasAnioPresion.mediaPresionAnio);
    app.route('/ops/anio/mediaArmPresion/:Anio').post(controllers.ops.anio.mediasAnioPresion.mediaArmPresionAnio);
    app.route('/ops/anio/mediaGeoPresion/:Anio').post(controllers.ops.anio.mediasAnioPresion.mediaGeoPresionAnio);
    //Temperatura
    app.route('/ops/anio/mediaTemp').post(controllers.ops.anio.mediasAnioTemp.mediaTempAnio);
    app.route('/ops/anio/mediaArmTemp').post(controllers.ops.anio.mediasAnioTemp.mediaArmTempAnio);
    app.route('/ops/anio/mediaGeoTemp').post(controllers.ops.anio.mediasAnioTemp.mediaGeoTempAnio);
    app.route('/ops/anio/mediaTemp/:Anio').post(controllers.ops.anio.mediasAnioTemp.mediaTempAnio);
    app.route('/ops/anio/mediaArmTemp/:Anio').post(controllers.ops.anio.mediasAnioTemp.mediaArmTempAnio);
    app.route('/ops/anio/mediaGeoTemp/:Anio').post(controllers.ops.anio.mediasAnioTemp.mediaGeoTempAnio);
    //Velocidad Viento
    app.route('/ops/anio/mediaVelViento').post(controllers.ops.anio.mediasAnioVelViento.mediaVelVientoAnio);
    app.route('/ops/anio/mediaArmVelViento').post(controllers.ops.anio.mediasAnioVelViento.mediaArmVelVientoAnio);
    app.route('/ops/anio/mediaGeoVelViento').post(controllers.ops.anio.mediasAnioVelViento.mediaGeoVelVientoAnio);
    app.route('/ops/anio/mediaVelViento/:Anio').post(controllers.ops.anio.mediasAnioVelViento.mediaVelVientoAnio);
    app.route('/ops/anio/mediaArmVelViento/:Anio').post(controllers.ops.anio.mediasAnioVelViento.mediaArmVelVientoAnio);
    app.route('/ops/anio/mediaGeoVelViento/:Anio').post(controllers.ops.anio.mediasAnioVelViento.mediaGeoVelVientoAnio);

    /**MEDIAS X MES */
    //Obtener MES de la URL
    app.use('/ops/mes/:tipoMedia/:Anio/:Mes',function(req, res, next) {
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
    });
    //Probabilidad Lluvia
    //Precipitaciones
    //Humedad relativa
    app.route('/ops/mes/mediaHumedad').post(controllers.ops.mes.mediasMesHumedad.mediaHumedadMes);
    app.route('/ops/mes/mediaHumedad/:Anio/:Mes').post(controllers.ops.mes.mediasMesHumedad.mediaHumedadMes);
    //Presion
    //Temperatura
    //Velocidad Viento
    /**MEDIAS X SEMANA */
    //Probabilidad Lluvia
    //Precipitaciones
    //Humedad relativa
    //Presion
    //Temperatura
    //Velocidad Viento
    /**MEDIAS X DIA */
    //Probabilidad Lluvia
    //Precipitaciones
    //Humedad relativa
    //Presion
    //Temperatura
    //Velocidad Viento

    //Misc.
    app.route('/ops/maxLluvia').post(controllers.ops.maxProbLluvia.maxLluvia);
    app.route('/ops/minLluvia').post(controllers.ops.minProbLluvia.minLluvia);
    app.route('/ops/random').post(controllers.ops.random.getRandom);
    app.route('/ops/random/:urlVar').post(controllers.ops.random.getRandom);
    //Prueba
    app.route('/ops/mediaLluvia2').post(controllers.ops.prototypeMediaProbLluvia.mediaLluvia);
    
    
    /*FIN PRUEBAS*/

    /*Errores*/
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        return res.status(500).render('errores/500');
    });

    app.use(function (req, res) {
        return res.status(404).render('errores/404');
    });
}
