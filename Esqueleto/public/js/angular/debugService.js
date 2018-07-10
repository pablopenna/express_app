/**Servicio para alamcenar los valores de
 * la variables que contendrán valores de debug.
 * Utiles para supervisar el funcionamiento del
 * programa pero no es necesario para su funcionamiento.
 * Puede ser accedido por diferentes controladores.
 */
app.service('debugService',function()
{
    this.msg = "";
    this.statusval = "";
    this.statustext = "";
    this.headers = "";
    this.resData = "";
    this.resetStatus = "";
});