//elementos basicos
var path = require('path');
var app = require(path.join(process.cwd(), 'server'));
var fs = require('fs');
var glob = require('glob');

//Operaciones filtros
var filtroMiddle = require(path.resolve(__dirname, path.join(process.cwd(),
'controllers', 'middleware', 'middlewareOps.js')));



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

    /*
     ____  ____  
    |  _ \| __ ) 
    | | | |  _ \ 
    | |_| | |_) |
    |____/|____/ 
    */
    //DB
    app.route('/db').get(controllers.dbOps.db_worker.getData);
    //app.route('/db').post(controllers.db_worker.setData);
    //app.route('/db/render').get(controllers.db_worker.renderDBTemplate);

    app.route('/weather').get(controllers.dbOps.db_worker_weather.getData);
    app.route('/weather').post(controllers.dbOps.db_worker_weather.setData);
    app.route('/weather').delete(controllers.dbOps.db_worker_weather.clearData);
    //
    //GET -> Accesible a través del navegador. PRUEBA.
    app.route('/reset').get(controllers.dbOps.db_weather_filler.resetDB);
    //POST -> Accesible a través de la aplicacion.
    app.route('/reset').post(controllers.dbOps.db_weather_filler.resetDB);
    //---
    //OPERACIONES
    //FILTRO
    app.use(filtroMiddle.genFiltro); 
    //Accesible desde navegador
    app.route('/ops/mediaLluvia').get(controllers.ops.global.mediaProbLluvia.mediaLluvia);
    //Accesible mediante POST
    /*
     ____                 
    | __ )  __ _ ___  ___ 
    |  _ \ / _` / __|/ _ \
    | |_) | (_| \__ \  __/
    |____/ \__,_|___/\___|
                        
    */
    /**MEDIAS ABSOLUTAS*/
    //Probabilidad de lluvia
    app.route('/ops/oldMediaLluvia').post(controllers.ops.global.mediaProbLluvia.oldMediaLluvia);
    app.route('/ops/oldMediaArmLluvia').post(controllers.ops.global.mediaProbLluvia.oldMediaArmLluvia);
    app.route('/ops/oldMediaGeoLluvia').post(controllers.ops.global.mediaProbLluvia.oldMediaGeoLluvia);
    app.route('/ops/mediaProbLluvia').post(controllers.ops.global.mediaProbLluvia.mediaLluvia);
    app.route('/ops/mediaArmProbLluvia').post(controllers.ops.global.mediaProbLluvia.mediaArmLluvia);
    app.route('/ops/mediaGeoProbLluvia').post(controllers.ops.global.mediaProbLluvia.mediaGeoLluvia);

    //Precipitaciones
    app.route('/ops/mediaPrecipitaciones').post(controllers.ops.global.mediasPrecipitaciones.mediaPrecipitaciones);
    app.route('/ops/mediaArmPrecipitaciones').post(controllers.ops.global.mediasPrecipitaciones.mediaArmPrecipitaciones);
    app.route('/ops/mediaGeoPrecipitaciones').post(controllers.ops.global.mediasPrecipitaciones.mediaGeoPrecipitaciones);

    //Humedad relativa
    app.route('/ops/mediaHumedad').post(controllers.ops.global.mediasHumedad.mediaHumedad);
    app.route('/ops/mediaArmHumedad').post(controllers.ops.global.mediasHumedad.mediaArmHumedad);
    app.route('/ops/mediaGeoHumedad').post(controllers.ops.global.mediasHumedad.mediaGeoHumedad);

    //Presion
    app.route('/ops/mediaPresion').post(controllers.ops.global.mediasPresion.mediaPresion);
    app.route('/ops/mediaArmPresion').post(controllers.ops.global.mediasPresion.mediaArmPresion);
    app.route('/ops/mediaGeoPresion').post(controllers.ops.global.mediasPresion.mediaGeoPresion);

    //Temperatura
    app.route('/ops/mediaTemp').post(controllers.ops.global.mediasTemp.mediaTemp);
    app.route('/ops/mediaArmTemp').post(controllers.ops.global.mediasTemp.mediaArmTemp);
    app.route('/ops/mediaGeoTemp').post(controllers.ops.global.mediasTemp.mediaGeoTemp);

    //Velocidad Viento
    app.route('/ops/mediaVelViento').post(controllers.ops.global.mediasVelViento.mediaVelViento);
    app.route('/ops/mediaArmVelViento').post(controllers.ops.global.mediasVelViento.mediaArmVelViento);
    app.route('/ops/mediaGeoVelViento').post(controllers.ops.global.mediasVelViento.mediaGeoVelViento);

    /*
        _     /\/|       
       / \   |/\/   ___  
      / _ \ | '_ \ / _ \ 
     / ___ \| | | | (_) |
    /_/   \_\_| |_|\___/                   
    */
    /**MEDIAS X AÑO */
    //Operaciones filtros
    var filtroOps = require(path.resolve(__dirname, path.join(process.cwd(),
        'controllers', 'ops', 'filtros', 'filtroOps')));
    //Inicializar filtro
    //app.use(filtroMiddle.initFiltro); 
    //Obtener AÑO de la URL
    //app.use('/ops/anio/*',filtroMiddle.genFiltroAnio);
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

    /*
     __  __           
    |  \/  | ___  ___ 
    | |\/| |/ _ \/ __|
    | |  | |  __/\__ \
    |_|  |_|\___||___/
    */
    /**MEDIAS X MES */
    //Obtener MES de la URL
    //app.use('/ops/mes/*',filtroMiddle.genFiltroMes);
    //Probabilidad Lluvia
    app.route('/ops/mes/mediaProbLluvia').post(controllers.ops.mes.mediasMesProbLluvia.mediaProbLluviaMes);
    app.route('/ops/mes/mediaProbLluvia/:Anio/:Mes').post(controllers.ops.mes.mediasMesProbLluvia.mediaProbLluviaMes);
    app.route('/ops/mes/mediaArmProbLluvia').post(controllers.ops.mes.mediasMesProbLluvia.mediaArmProbLluviaMes);
    app.route('/ops/mes/mediaArmProbLluvia/:Anio/:Mes').post(controllers.ops.mes.mediasMesProbLluvia.mediaArmProbLluviaMes);
    app.route('/ops/mes/mediaGeoProbLluvia').post(controllers.ops.mes.mediasMesProbLluvia.mediaGeoProbLluviaMes);
    app.route('/ops/mes/mediaGeoProbLluvia/:Anio/:Mes').post(controllers.ops.mes.mediasMesProbLluvia.mediaGeoProbLluviaMes);
    //Precipitaciones
    app.route('/ops/mes/mediaPrecipitaciones').post(controllers.ops.mes.mediasMesPrecipitaciones.mediaPrecipitacionesMes);
    app.route('/ops/mes/mediaPrecipitaciones/:Anio/:Mes').post(controllers.ops.mes.mediasMesPrecipitaciones.mediaPrecipitacionesMes);
    app.route('/ops/mes/mediaArmPrecipitaciones').post(controllers.ops.mes.mediasMesPrecipitaciones.mediaArmPrecipitacionesMes);
    app.route('/ops/mes/mediaArmPrecipitaciones/:Anio/:Mes').post(controllers.ops.mes.mediasMesPrecipitaciones.mediaArmPrecipitacionesMes);
    app.route('/ops/mes/mediaGeoPrecipitaciones').post(controllers.ops.mes.mediasMesPrecipitaciones.mediaGeoPrecipitacionesMes);
    app.route('/ops/mes/mediaGeoPrecipitaciones/:Anio/:Mes').post(controllers.ops.mes.mediasMesPrecipitaciones.mediaGeoPrecipitacionesMes);
    //Humedad relativa
    app.route('/ops/mes/mediaHumedad').post(controllers.ops.mes.mediasMesHumedad.mediaHumedadMes);
    app.route('/ops/mes/mediaHumedad/:Anio/:Mes').post(controllers.ops.mes.mediasMesHumedad.mediaHumedadMes);
    app.route('/ops/mes/mediaArmHumedad').post(controllers.ops.mes.mediasMesHumedad.mediaArmHumedadMes);
    app.route('/ops/mes/mediaArmHumedad/:Anio/:Mes').post(controllers.ops.mes.mediasMesHumedad.mediaArmHumedadMes);
    app.route('/ops/mes/mediaGeoHumedad').post(controllers.ops.mes.mediasMesHumedad.mediaGeoHumedadMes);
    app.route('/ops/mes/mediaGeoHumedad/:Anio/:Mes').post(controllers.ops.mes.mediasMesHumedad.mediaGeoHumedadMes);
    //Presion
    app.route('/ops/mes/mediaPresion').post(controllers.ops.mes.mediasMesPresion.mediaPresionMes);
    app.route('/ops/mes/mediaPresion/:Anio/:Mes').post(controllers.ops.mes.mediasMesPresion.mediaPresionMes);
    app.route('/ops/mes/mediaArmPresion').post(controllers.ops.mes.mediasMesPresion.mediaArmPresionMes);
    app.route('/ops/mes/mediaArmPresion/:Anio/:Mes').post(controllers.ops.mes.mediasMesPresion.mediaArmPresionMes);
    app.route('/ops/mes/mediaGeoPresion').post(controllers.ops.mes.mediasMesPresion.mediaGeoPresionMes);
    app.route('/ops/mes/mediaGeoPresion/:Anio/:Mes').post(controllers.ops.mes.mediasMesPresion.mediaGeoPresionMes);
    //Temperatura
    app.route('/ops/mes/mediaTemp').post(controllers.ops.mes.mediasMesTemp.mediaTempMes);
    app.route('/ops/mes/mediaTemp/:Anio/:Mes').post(controllers.ops.mes.mediasMesTemp.mediaTempMes);
    app.route('/ops/mes/mediaArmTemp').post(controllers.ops.mes.mediasMesTemp.mediaArmTempMes);
    app.route('/ops/mes/mediaArmTemp/:Anio/:Mes').post(controllers.ops.mes.mediasMesTemp.mediaArmTempMes);
    app.route('/ops/mes/mediaGeoTemp').post(controllers.ops.mes.mediasMesTemp.mediaGeoTempMes);
    app.route('/ops/mes/mediaGeoTemp/:Anio/:Mes').post(controllers.ops.mes.mediasMesTemp.mediaGeoTempMes);
    //Velocidad Viento
    app.route('/ops/mes/mediaVelViento').post(controllers.ops.mes.mediasMesVelViento.mediaVelVientoMes);
    app.route('/ops/mes/mediaVelViento/:Anio/:Mes').post(controllers.ops.mes.mediasMesVelViento.mediaVelVientoMes);
    app.route('/ops/mes/mediaArmVelViento').post(controllers.ops.mes.mediasMesVelViento.mediaArmVelVientoMes);
    app.route('/ops/mes/mediaArmVelViento/:Anio/:Mes').post(controllers.ops.mes.mediasMesVelViento.mediaArmVelVientoMes);
    app.route('/ops/mes/mediaGeoVelViento').post(controllers.ops.mes.mediasMesVelViento.mediaGeoVelVientoMes);
    app.route('/ops/mes/mediaGeoVelViento/:Anio/:Mes').post(controllers.ops.mes.mediasMesVelViento.mediaGeoVelVientoMes);

    /* 
      ____                                   
     / ___|  ___ _ __ ___   __ _ _ __   __ _ 
     \___ \ / _ \ '_ ` _ \ / _` | '_ \ / _` |
      ___) |  __/ | | | | | (_| | | | | (_| |
     |____/ \___|_| |_| |_|\__,_|_| |_|\__,_|
                                         
    */
    /**MEDIAS X SEMANA */
    //app.use('/ops/semana/*',filtroMiddle.genFiltroMes);
    //Probabilidad Lluvia
    //Precipitaciones
    //Humedad relativa
    //Presion
    //Temperatura
    app.route('/ops/semana/mediaTemp').post(controllers.ops.semana.mediasSemanaTemp.mediaTempSemana);
    app.route('/ops/semana/mediaArmTemp').post(controllers.ops.semana.mediasSemanaTemp.mediaArmTempSemana);
    app.route('/ops/semana/mediaGeoTemp').post(controllers.ops.semana.mediasSemanaTemp.mediaGeoTempSemana);
    //Velocidad Viento
  
    /*
     ____  __      
    |  _ \/_/ __ _ 
    | | | | |/ _` |
    | |_| | | (_| |
    |____/|_|\__,_|
    */
    /**MEDIAS X DIA */
    //Probabilidad Lluvia
    //Precipitaciones
    //Humedad relativa
    //Presion
    //Temperatura
    app.route('/ops/dia/mediaTemp').post(controllers.ops.dia.mediasDiaTemp.mediaTempDia);
    app.route('/ops/dia/mediaArmTemp').post(controllers.ops.dia.mediasDiaTemp.mediaArmTempDia);
    app.route('/ops/dia/mediaGeoTemp').post(controllers.ops.dia.mediasDiaTemp.mediaGeoTempDia);
    //Velocidad Viento

    /*
      __  __ _            
     |  \/  (_)___  ___   
     | |\/| | / __|/ __|  
     | |  | | \__ \ (__ _ 
     |_|  |_|_|___/\___(_)
    */
    app.route('/meta/:periodo/:tipoMedia/:campo').post(controllers.ops.metaEnvoltorio.metaEnvoltorio);
    //Misc.
    app.route('/ops/maxLluvia').post(controllers.ops.global.maxProbLluvia.maxLluvia);
    app.route('/ops/minLluvia').post(controllers.ops.global.minProbLluvia.minLluvia);
    app.route('/ops/random').post(controllers.ops.random.getRandom);
    app.route('/ops/random/:urlVar').post(controllers.ops.random.getRandom);
    //numero semana
    app.route('/week/:dia/:mes/:anio').post(controllers.ops.semana.testSemana.testWeek);
     
    /*FIN PRUEBAS*/

    /*
     _____                              
    | ____|_ __ _ __ ___  _ __ ___  ___ 
    |  _| | '__| '__/ _ \| '__/ _ \/ __|
    | |___| |  | | | (_) | | |  __/\__ \
    |_____|_|  |_|  \___/|_|  \___||___/
    */
    /*Errores*/
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        return res.status(500).render('errores/500');
    });

    app.use(function (req, res) {
        return res.status(404).render('errores/404');
    });
}
