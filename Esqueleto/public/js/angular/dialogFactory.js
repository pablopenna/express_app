/**Requiere JQuery-ui*/

app.factory('dialogService',function()
{

    var factory = {};

    //Constante con el id del elemento que
    //se empleará como dialog
    factory.dialogID = 'miDialogo'

    //Inicializa Dialog
    factory.initDialog = function()
    {
        console.log("HOLA!" + factory.dialogID);
        $("#"+factory.dialogID).dialog({
            autoOpen: false,
            resizable: false,
            modal: true,
            width: '80%',
            buttons: {
                "dialogButton":{ 
                    text: "Cerrar",
                    id: "dialogOkBoton",
                    click: function() {
                        $(this).dialog("close");
                    }
                }
            },
            show: {
                effect: "blind",
                duration: 100
            },
            hide: {
                effect: "blind",
                duration: 100
            }
        });
    }

    //Muestra Dialog
    factory.showDialog = function()
    {
        if(document.readyState === "complete")
        {
            //muestro diálogo
            $("#"+factory.dialogID).dialog("open");
        }   
        else
        {
            console.log("ATENCION: no se ha mostrado el diálogo porque" + 
            "todavia no ha cargado");
        }
    }

    return factory;
});
