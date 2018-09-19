/** Servicio que contiene los diferentes parámetros fijos que el cliente
 * puede especificar a la hora de hacer una petición al Back-End.
 */
app.factory('requestParamService',function()
{

    var factory = {};

    //Periodo
    factory.listaPeriodos = [
        {nombre: "Global", valor: "global"},
        {nombre: "Año", valor: "anio"},
        {nombre: "Mes", valor: "mes"},
        {nombre: "Semana", valor: "semana"},
        {nombre: "Día", valor: "dia"},
    ];

    //Operacion (tipo media)
    factory.listaOps = [
        {nombre: "Media Aritmética", valor: "media"},
        {nombre: "Media Armónica", valor: "mediaarm"},
        {nombre: "Media Geométrica", valor: "mediageo"}
    ];

    //Campo empleado
    factory.listaCampos = [
        {nombre: "Temperatura (C)", valor: "temp"},
        {nombre: "Probabilidad Lluvia (%)", valor: "probLluvia"},
        {nombre: "Precipitaciones (litros/m²)", valor: "precipitaciones"},
        {nombre: "Humedad Relativa (%)", valor: "humedad"},
        {nombre: "Velocidad Viento (km/h)", valor: "velViento"},
        {nombre: "Presión Atmosférica (hPa)", valor: "presion"},
    ];
    
    return factory;
});
