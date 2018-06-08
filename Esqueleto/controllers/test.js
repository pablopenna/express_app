/* TEST.JS */
/*Hay qu declarar así las funciones de forma que sean accesibles 
desde router.js de la forma controllers_web.<nombre_archivo_js>.<nombre_funcion_exportada>.
Por ejemplo: controllers_web.test.testFunc.

Si se declaran de la forma tradicional 'function <nombre_funcion> () no
será accesible desde router.js'*/
exports.testFunc = function (req, res)
{
    res.render('test/test');
}

function testFunc2(req, res)
{
    res.send('funciona?');
}