/**Requiere JQuery-ui*/

//Constante con el id del elemento que
//se empleará como dialog
const dialogID = 'miDialogo'

//Inicializa Dialog
function initDialog()
{
    $(function() {
        $("#"+dialogID).dialog({
        autoOpen: true,
        resizable: false,
        modal: true,
        width:'auto',
        buttons: {
            "dialogButton":{ 
                text: "Cerrar",
                id: "dialogOkBoton",
                click: function() {
                $( this ).dialog( "close" );
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
    });
}

//Muestra Dialog
function showDialog()
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

//Inicializamos Dialog al cargar script
initDialog();