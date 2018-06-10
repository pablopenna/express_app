//elementos basicos
var path = require('path');
var app = require(path.join(process.cwd(), 'server'));
var fs = require('fs');
var glob = require('glob');


//este es el proceso encargado de establecer los controladores y asignarlos a su carpeta
var controllers_web = {};
var files = glob.sync(path.join(process.cwd(), 'controllers', '**', '*.js'));
//DEBUG
console.log("FILES: " + files);
files.forEach(function (file) {
    var temp = controllers_web;
    console.log("temp: " + temp);
    var parts = path.relative(path.join(process.cwd(), 'controllers'), file).slice(0, -3).split(path.sep);
    console.log("parts: " + parts);

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
for (i in controllers_web)
{
    console.log("CONTROLLER " + i + ": " + controllers_web[i]);
}
console.log("WIKI: " + controllers_web.wiki);
console.log("WIKI.HOME: " + controllers_web.wiki.home);
console.log("WIKI.ABOUT: " + controllers_web.wiki.about);

//Proceso para asociar las peticiones a los métodos del controlador
module.exports = function () {
    //añadimos el index
    //app.route('/').get(controllers.main.main);
    
    /*Podemos asignar tantas rutas como queramos, incluyendo parámetros, middleware y todo lo que Express soporte.Algunos ejemplos:
    app.route('/:id').get(controllers_web.users.show);
    app.route('/admin').get(auth.check, controllers_web.admin.main);
    app.route('/admin/edit/:id').get(auth.check, controllers_web.admin.edit);*/
    
    /*Pruebas*/
    //app.use(<prefijo>,<funcion>) es para middleware. Ejecuta la función para cada petición
    //cuya ruta contenga el prefijo.
    //Hello world. Basico. Acepta Get y Post

    //app.get(<ruta>,<funcion>). Ejecuta la funcion cundo se recibe una peticion GET
    //a la ruta espeificada
    
    /*
    app.all('/', function (req, res) {
        res.send('Hello World!');
    });*/

    app.all('/', function(req, res)
    {
        res.render('test/pages/index.ejs');
    });

    app.all('/about', function(req, res)
    {
        res.render('test/pages/about.ejs');
    });

    /*route*/
    //app.route() se utiliza para desglosar 
    //una misma ruta para los diferentes tipos
    //de petición.
    app.route('/wik/')
    .get(function(req,res,next)
    {
        //Provoca error interno del servidor.
        //Para mostrar template 500.html
        testFunc2();
        res.send('This is the wik');
    })
    .post(function(req,res,next)
    {
        res.send('This is the wik - POST');
    });

    /*separado*/
    app.route('/wiki/').get(controllers_web.wiki.home);
    app.route('/wiki/about').get(controllers_web.wiki.about);
    app.route('/test').get(controllers_web.test.testFunc);
    //No funciona. testFunc2() no esta declarado (undefined)
    //app.route('/test2').get(controllers_web.test.testFunc2);

    //DB
    //import router
    var DbWorkerRouter = require('./controllers/db_worker');
    //añado rutas empleando el router importado
    app.use('/db',DbWorkerRouter);

    /*FIN PRUEBAS*/

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        return res.status(500).render('errores/500');
    });

    app.use(function (req, res) {
        return res.status(404).render('errores/404');
    });
}
