module.exports = {
    filtroAnio : function(fecha)
    {
        //var a = new Date(2018,0,1,1,0,0) 
        //a -> Date 2018-01-01T00:00:00.000Z
        //String(a) -> "Mon Jan 01 2018 01:00:00 GMT+0100 (CET)"
        const fechaMin = new Date(String(fecha));
        const fechaMax = new Date(String(fecha+1));
        const filtro = {dia :{$gt: fechaMin, $lt: fechaMax}};
        return filtro;
    }
}