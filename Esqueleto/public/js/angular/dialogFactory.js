/**Requiere JQuery-ui*/

app.factory('dialogService',function()
{

    var factory = {};

    //Constante con el id del elemento que
    //se empleará como dialog
    factory.dialogID = 'miDialogo'
    //ID del contenedor dentro del dialogo
    //cuyo contenido (texto) podemos o
    //quermos cambiar
    factory.textID = 'textoDialogo'

    //Inicializa Dialog. Se puede especificar el id 
    //del elemento que se quiere iniciar como dialogo.
    //Si no se especifica ninguno, se tomará el
    //valor de factory.dialogID por defecto.
    factory.initDialog = function(dialogID = factory.dialogID)
    {
        console.log("HOLA!" + dialogID);
        $("#"+dialogID).dialog({
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

    //Muestra Dialog.
    //Se puede especificar el id 
    //del elemento que contiene el dialogo 
    //a mostrar.
    //Si no se especifica ninguno, se tomará el
    //elemento con id == factory.dialogID por defecto.
    factory.showDialog = function(dialogID = factory.dialogID)
    {
        if(document.readyState === "complete")
        {
            //muestro diálogo
            $("#"+dialogID).dialog("open");
        }   
        else
        {
            console.log("ATENCION: no se ha mostrado el diálogo porque" + 
            "todavia no ha cargado");
        }
    }

    //Cambiamos el contenido del elemento con id == textID dentro
    //del elemento con id == dialogID, por lo que limitamos el cambio dentro del
    //diálogo. 
    //Se puede especificar el id 
    //del elemento que contiene el dialogo 
    //a mostrar.
    //Si no se especifica ninguno, se tomará el
    //elemento con id == factory.dialogID por defecto.
    //Lo mismo pasa con el id del elemento que contiene el texto.
    factory.setDialogText = function(msg,
        dialogID = factory.dialogID,
        textID = factory.textID)
    {
        $("#"+dialogID +" "
        +"#"+textID).html(msg);
    }

    return factory;
});
