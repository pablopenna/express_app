/* TEST.JS */
/*Hay qu declarar así las funciones de forma que sean accesibles 
desde router.js de la forma controllers_web.<nombre_archivo_js>.<nombre_funcion_exportada>.
Por ejemplo: controllers_web.test.testFunc.

Si se declaran de la forma tradicional 'function <nombre_funcion> () no
será accesible desde router.js'*/

module.exports = {
    testFunc : function (req, res)
    {   
        var lista=[];
        for(i=0;i<10;i++)
        {
            lista.push(i);
        }
        console.log('LISTA: ' + lista);
        res.render('test/test',
        {title: 'CUSTOM TITLE', myvar: lista});
    },

    testAng : function (req, res)
    {
        res.render('test/angulartest.html');
    }
};