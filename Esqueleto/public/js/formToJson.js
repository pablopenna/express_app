/*Recibe los datos de form.serializeArray()
Obtengo:
[{"name":"numero","value":"1"},{"name":"cadena","value":"asd"}]
y necesito:
{"numero":1, "cadena":"asd"}*/

function parseFormArrayToJson(formArray)
{
    var jsonObject = {}
    for(i in formArray)
    {
        var campo = formArray[i]['name'];
        var valor = formArray[i]['value'];
        jsonObject[campo]=valor;
    }
    return jsonObject;
}