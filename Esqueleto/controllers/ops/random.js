/**Devuelve un numero aleatorio. Se utilizara para probar el mostrar
 * las diferencias entre el cliente y el server.
 */
module.exports = 
{
    getRandom : function(req, res){
        console.log("La variable en la url: " + req.params.urlVar);
        var numero = parseInt(Math.random()*100);
        var numero2 = 100;
        var envelopee = {"descr" : "Numeros pseudoaleatorios",
            "label" : "Random"+String(numero),
            "data" : [numero2, numero2
            ,parseInt(numero*Math.random()/50)
        ]};
        if(req.params.urlVar != undefined)
        {
            envelopee["data"].push(req.params.urlVar);
        }
        res.send(envelopee);
    }
}