/**Servicio (Factory) para trabajar con strings que contengan
 * URLs y parsearlas. Al ser un servicio puede ser accedido
 * por diferentes controladores.
 */
app.factory('urlService', function()
{
    var factory = {};

    factory.method1 = function(){
        window.alert("SOY EL FATORY URL!");
    };

    return factory;
});