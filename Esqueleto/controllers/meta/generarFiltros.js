/**Funciones empleadas para generar los filtros.
 * Estos filtros se emplearñan en la consulta de la base de datos
 * de forma que la respuesta a la misma sólo nos devuelva datos del
 * período especificado.
 */

module.exports = {
    /**Genera un filtro para el año indicado.
     * P.ej: Si se especifica el 2015 como argumento,
     * creará un filtro para obtener los datos que tengan
     * ese año como fecha.
     */
    filtroAnio : function(anio)
    {
        //var a = new Date("2018")
        //a -> Date 2018-01-01T00:00:00.000Z
        //String(a) -> "Mon Jan 01 2018 01:00:00 GMT+0100 (CET)"
        //var b = new Date(2018,0,1,0,0,0)
        //b -> Date 2017-12-31T23:00:00.000Z
        //String(b) -> "Mon Jan 01 2018 00:00:00 GMT+0100 (CET)" 
        //b.getFullYear() -> 2018
        //a.getHours() -> 1
        //b.getHours() -> 0

        //Lo siguiente me suma una hora y no estaría bien
        //const fechaMin = new Date(String(anio));
        //const fechaMax = new Date(String(anio+1));

        const fechaMin = new Date(anio,0,1,0,0,0);
        //Le resto 1 milisegundo paraq ue siga siendo el mismo año.
        const fechaMax = new Date(anio+1,0,1,0,0,0,-1);
        const filtro = {dia :{$gt: fechaMin, $lt: fechaMax}};
        return filtro;
    },

    /**Recibe el mes del cliente y halla datos para el mismo. 
     * El cliente especificará un mes del 1 al 12, sin embargo,
     * js trata los meses del 0 al 11.
     * Recibo el mes como numero.
     * El filtro se genera para un mes específico, es decir,
     * que debe especificarse también el año.
    */
    filtroMes : function(mesCliente, anioCliente)
    {
        //Convierto mes
        var mes = mesCliente-1
        //Si el mes no es correcto calculo para enero.
        if(mes > 11 || mes < 0 || isNaN(mes))
        {
            mes=0;
        }

        //convierto Año
        var anio = anioCliente;
        if(isNaN(anio))
        {
            anio = 2000;
        }

        const fechaMin = new Date(anio,mes,1,0,0,0);
        //Le resto 1 milisegundo paraq que siga siendo el mismo mes.
        const fechaMax = new Date(anio,mes+1,1,0,0,0,-1);

        const filtro = {dia :{$gt: fechaMin, $lt: fechaMax}};
        return filtro;
    }
}