//elementos basicos
var path = require('path');
var app = require(path.join(process.cwd(), 'server'));
var fs = require('fs');
var glob = require('glob');


//este es el proceso encargado de establecer los controladores y asignarlos a su carpeta
var controllers_web = {};
var files = glob.sync(path.join(process.cwd(), 'controllers', '**', '*.js'));
files.forEach(function (file) {
    var temp = controllers_web;
    var parts = path.relative(path.join(process.cwd(), 'controllers'), file).slice(0, -3).split(path.sep);

    while (parts.length) {
        if (parts.length === 1) {
            temp[parts[0]] = require(file);
        } else {
            temp[parts[0]] = temp[parts[0]] || {};
        }
        temp = temp[parts.shift()];
    }
});

//Proceso para asociar las peticiones a los métodos del controlador
module.exports = function () {
    //añadimos el index
    //app.route('/').get(controllers.main.main);
    
    /*Podemos asignar tantas rutas como queramos, incluyendo parámetros, middleware y todo lo que Express soporte.Algunos ejemplos:
    app.route('/:id').get(controllers_web.users.show);
    app.route('/admin').get(auth.check, controllers_web.admin.main);
    app.route('/admin/edit/:id').get(auth.check, controllers_web.admin.edit);*/
    /*Custom*/

    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    /**/

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        return res.status(500).render('errores/500');
    });

    app.use(function (req, res) {
        return res.status(404).render('errores/404');
    });
}
