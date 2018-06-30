/**Devuelve un numero aleatorio. Se utilizara para probar el mostrar
 * las diferencias entre el cliente y el server.
 */
module.exports = 
{
    getRandom : function(req, res){
        var numero = parseInt(Math.random()*100);
        var envelopee = {"op" : "Random","res" : [numero, numero+10]};
        res.send(envelopee);
    }
}