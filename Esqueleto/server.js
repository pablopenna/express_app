//insertamos todas las librerias requeridas
var express = require('express'); //incluimos la libreria de express
var session = require('express-session'); //libreria para uso de sesiones en express
var path = require('path'); //incluimos la libreria para facilitar el uso de los direccionamientos de server
var mongoose = require('mongoose'); //incluimos la libreria para manejar la base de datos 
var ejs = require('ejs'); //incluimos la visualizacion por ejs para luego hacer redireccion a html
var bodyParser = require('body-parser'); //libreria para mejorar el uso de las variables enviadas por get y post

//variable global de express
var app = express();
//definimos la sentencia setting
app.set('settings', require(path.resolve(__dirname, path.join(process.cwd(), 'config'))));
var configuracion = app.get('settings');

//conectamos con la base de datos
conexion = 'mongodb://' + configuracion.database.user.toString() + ':' + configuracion.database.password.toString() + '@' + configuracion.database.domain + ':' + configuracion.database.port + '/' + configuracion.database.name.toString();
mongoose.connect(conexion);

//Le indicamos a express donde estan las vistas y que motor de vistas debe cargar
app.set('views', path.resolve(__dirname, path.join(process.cwd(), 'views')));
//definimos el visor por defecto
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

//sentencia para definir la ruta de los html
app.use(express.static(path.resolve(__dirname, path.join(process.cwd(), 'public'))));

//añadimos los elementos requeridos por express De este modo después podemos utilizar variables como #{config.title} dentro de nuestras plantillas.
app.use(require('serve-favicon')(path.resolve(__dirname, path.join(process.cwd(), 'public', 'image','favicon.ico'))));
app.use(require('morgan')('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(require('cookie-parser')());

//configuraciones propias
app.locals.settings = app.get('settings');
//definimos una variable de sesion de la app
var sess = {
    secret: 'Cookie Pump Verder Proyect web',
    cookie: {},
    resave: true,
    saveUninitialized: true,
}
//utililzamos esa variable para todo el sistema (no es igual para todos, simplemente una incializacion)
app.use(session(sess));

//como usamos un paquete de configuracion json debemos activarlo
if (configuracion.env === 'development') {
    app.use(require('errorhandler')());
    app.locals.pretty = true;
}

//para utilizar app en todo el proyecto
module.exports = app;

//indicamos la direccion del archivo routes
require(path.resolve(__dirname, path.join(process.cwd(), 'router')))();


app.listen(configuracion.port, () => {
    console.log(`Escuchando en puerto:${configuracion.port}`);
});