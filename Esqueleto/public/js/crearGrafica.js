/*REFERENCIA. REQUIERE PLOTLY.JS*/

function pruebaGraph(arg)
{
    window.alert("PREUBA: " + arg);
}
/*
Crea una gráfica simple con los datos recibdos en el elemento elem.
Gráfica de líneas.
    -> elem es el elemento html en el que escribiremos
    la gráfica
    -> datosX es una lista con los datos del ejeX
    -> datosY es una lista con los datos del ejeY
*/
function crearGraficaSimple(elem, datosX, datosY)
{
        var myLayout = getScatterLayout();
        fixGraphData(datosX,datosY)
        crearGrafo(elem,datosX,datosY,'scatter','markers', myLayout);
}

function crearGrafica(elem, datosX, datosY, tipo, modo, myLayout = {margin:{t:0}} )
{
    var trace1 = {
        x: datosX,
        y: datosY,
        type: tipo,
        mode: modo
    }   
    //Lista con todas las trazas
    var datos = [trace1];
    //Si se emplea Plotly.plot en lugar de 
    //Plotly.newPlot, la gráfica generada se
    //añadirá a la ya existente en vez de
    //sobrescribirla.
    Plotly.newPlot( 
        elem, 
        datos, 
        //{ margin: { t: 0 } } 
        myLayout
    );
}

/**Los casos que contempla e intenta arreglar son:
 * - datosX inexistente.
 * - datosY no es una lista (único elemento).
 */
function fixGraphData(datosX, datosY)
{
    
    if(datosY.length == undefined)
    {
        //datosY no es una lista. Lo meto en una.
        //Enfocado principalmente a datos Y por si solo
        //hay uno
        datosY = [datosY];
    }

    if(datosX == undefined)
    {
        //Si no se pasan los datosX, creo una lista
        //con tantos indices como elementos haya en 
        //datos Y
        datosX=[];
        contador = 0;
        for(i in datosY)
        {
            datosX.push(++contador);
        }
    }

    

}
//---------------------------------------------------
//Var global con la lista de selectores de todos los elementos
//en los que he creado una gráfica. Emplearé esta lista
//para redimensionar las gráficas cuando cambie el
//tamaño de la ventana.
var listaGlobalElementos = [];

/* Función básica para crear las gráficas. El resto de funciones
dependerán de esta.
Hay que especifiar el elemente donde escribir la gráfica, los
datos de los ejes X e Y, así como el tipo y modo de la gráfica.
Tipos conocidos:
    - scatter (líneas - puntos)
    - bar (barras)

modos conocidos:
    - markers (si se emplea junto con scatter no se 
    dibujan líneas para unir los puntos).
    
*/
function crearGrafo(elem, datosX, datosY, tipo, modo, myLayout = {margin:{t:0}} )
{
    var trace1 = {
        x: datosX,
        y: datosY,
        type: tipo,
        mode: modo
    }
    
    //Lista con todas las trazas
    var datos = [trace1];
    //Si se emplea Plotly.plot en lugar de 
    //Plotly.newPlot, la gráfica generada se
    //añadirá a la ya existente en vez de
    //sobrescribirla.
    Plotly.newPlot( 
        elem, 
        datos, 
        //{ margin: { t: 0 } } 
        myLayout
    );
    
    //Añado elemento a la lista
    addElemToGlobalList(elem,listaGlobalElementos);
}

/*
Crea una gráfica simple con los datos recibdos en el elemento elem.
Gráfica de líneas.
    -> elem es el elemento html en el que escribiremos
    la gráfica
    -> datosX es una lista con los datos del ejeX
    -> datosY es una lista con los datos del ejeY
*/
function crearGrafoSimple(elem, datosX, datosY)
{
        var myLayout = getScatterLayout();
        crearGrafo(elem,datosX,datosY,'scatter','markers', myLayout);
}

function crearGrafoSimpleOrdenado(elem, datosX, datosY)
{   
    //ORDENAR NUMERICAMENTE
    //array.sort((a, b) => a - b);
    //(a, b) => a - b es la definición de una función anónima.
    //ORDENAR ALFABETICAMENTE
    //array.sort();

    var ordenado=true;
    for(var i=0;i<datosX.length-1;i++)
    {
        if(datosX[i]>datosX[i+1])
        {
            ordenado=false;
        }
    }
    if(!ordenado)
    {
        datosX=datosX.reverse();
        datosY=datosY.reverse();
    }
    crearGrafoSimple(elem,datosX,datosY);
}


/*
Crea una gráfica simple con los datos recibdos en el elemento elem.
Gráfica de barras.
    -> elem es el elemento html en el que escribiremos
    la gráfica
    -> datosX es una lista con los datos del ejeX
    -> datosY es una lista con los datos del ejeY
*/
function crearGrafoBarras(elem, datosX, datosY, layout)
{
    if(layout == undefined)
    {
        crearGrafo(elem,datosX,datosY,'bar','None');
    }
    else
    {
        crearGrafo(elem,datosX,datosY,'bar','None',layout);
    }
}

/* GRAFOS ESPECIFICOS.*/
/* GRAFOS CON LAS FRECUENCIAS DE LOS NUMEROS ALEATORIOS */

/* Para creaer este grafo, trabajeremos principalmente con la lista de números.
No necesitaremos la lista de fehcas en principio.*/
function crearGrafoFreq(elem,listaNumeros,anchuraIntervalo)
{
    anchuraIntervalo = parseInt(anchuraIntervalo);
    //Si la anchura recibida no es un número
    if(isNaN(anchuraIntervalo))
    {
        anchuraIntervalo=10;
    }
    //Si la anchura recibida es 0 o menor que 0
    if(anchuraIntervalo<=0)
    {
        anchuraIntervalo=1;
    }
    //Indico el valor maximo que pude tener 
    //un numero, necesario para crear
    //la lista de intervalos
    //var limite = 100;
    var limite = parseFloat(getLimiteSuperiorNumerico(listaNumeros))
    //------------- 
    //Creo una lista con los intervalos que tendré.
    //Esta lista la pondré en el eje X de la gráfica.
    var listaIntervalos = getListaIntervalos(listaNumeros, anchuraIntervalo, limite)
    console.log('listaIntervalos: ' + listaIntervalos);
    //-----

    //En esta lista almacenaré cuantos números hay en cada intervalo.
    var listaContadoresIntervalos = getListaContadoresIntervalos(listaNumeros,
        listaIntervalos, anchuraIntervalo);
    console.log('listaNumeros: ' + listaNumeros);
    console.log('listaContadores: ' + listaContadoresIntervalos);

    //Obtengo layout para grafo frecuencias
    var myLayout = getFreqLayout();
    //Creo gráfica
    crearGrafoBarras(elem,listaIntervalos,listaContadoresIntervalos,myLayout);

}
/*
Función que dada la lista de los números y la anchura de los
intervalos, devuelve una lista que contiene los intervalos.
También necesito conocer el límite superior de los números para
poder definir el último intervalo.
*/
function getListaIntervalos(listaNumeros, anchuraIntervalo, limite)
{
    //Creo una lista con los intervalos que tendré.
    //Esta lista la pondré en el eje X de la gráfica.
    var listaIntervalos = [];
    //Creo lista con los intervalos
    var indice = 0;
    while(indice < limite)
    {
        indice+=anchuraIntervalo
        if(indice > limite)
        {
            indice=limite;
        }
        listaIntervalos.push(indice);
    }
    //La lista intervalos contiene en cada posición un número
    //indica el límite superior del intervalo.
    //Si, por ejemplo, la anchura del intervalo es 20 y
    //el elemento [1] de la lista es 40, quiere decir que
    //ese intervalo es de 20 a 40.
    //Almacenaremos en la lista los intervalos como cadenas
    //que expresen de forma más clara el intervalo

    //En caso de que la anchura de intervalos sea mayor que el limite,
    //limito la anchura para que se cree bien la etiqueta del intervalo
    //al restar la anchura de intervalo
    if(anchuraIntervalo>limite)
    {
        anchuraIntervalo=limite;
    }
    for(var i=0;i<listaIntervalos.length;i++)
    {
        listaIntervalos[i]=String(
            listaIntervalos[i] - anchuraIntervalo + " - "
            + listaIntervalos[i]);
    }
    //La lista de intervalos creada estará en el eje X

    return listaIntervalos;
    
}

/*Dadas las listas con los números y los intervalos,
generará una lista con los contadores de cuántos números 
de la lista de Números hay en cada intervalo.*/
function getListaContadoresIntervalos(listaNumeros, listaIntervalos,
anchuraIntervalo)
{
    //Creo una lista con los intervalos que tendré.
    //Esta lista la pondré en el eje X de la gráfica.
    var listaContadoresIntervalos = [];
    //La inicializo poniendo los contadores de cada intervalo a 0.
    //Deberá tener la misma longitud que la lista de intervalos.
    for(var i=0; i<listaIntervalos.length;i++)
    {
        listaContadoresIntervalos[i]=0;
    }

    //Recorrer la lista de números aleatorios 
    //Clasificándolos según el intervalo en el que se encuentren.
    var indice = 0;
    //Elimino "" de lista Numeros, de forma que si esta
    //vacio no me añada un contador en la primera posicion
    //al entrar en el bucle for
    listaNumeros = listaNumeros.filter(Boolean);

    for(var i=0;i<listaNumeros.length;i++)
    {
        //console.log("listaNum: ");
        //console.log(listaNumeros);
        //console.log("Long listaNum: " + listaNumeros.length);
        //console.log("iteracion - " + i);
        //console.log("num - " + listaNumeros[i]);
        //Obtengo el índice del intervalo al que 
        //pertenece el número. La clave del éxito
        //es esta siguiente línea.
        indice = parseInt(listaNumeros[i]/anchuraIntervalo);
        //incremento contador
        listaContadoresIntervalos[indice]++;
    }
    return listaContadoresIntervalos;
}
/*
Función que dada la lista con los números aleatorios
devuelve el más alto (límite superior) y lo redondea a 
entero.
Si la lista de los datos no contiene elementos numéricos,
esta función devolverá 100 como límite superior.
*/
function getLimiteSuperiorNumerico(listaDatos)
{
    var limite = parseFloat(getLimiteSuperior(listaDatos));
    if(isNaN(limite))
    {
        limite=100;
    }
    //Redondear a Int. Queda mejor
    //que el limite superior sea tambien
    //un numero entero en vez de un decimal.
    if(limite % 1 > 0)
    {
        limite=parseInt(limite)+1;
    }
    else
    {
        limite=parseInt(limite);
    }

    return limite
}

/*
Función que dada una lista devuelve el valor
del elemento más alto (límite superior) en caso de
que la lista contenga valores numéricos.
*/
function getLimiteSuperior(listaDatos)
{
    lim=listaDatos[0];
    for(var i=0;i<listaDatos.length;i++)
    {
        if(listaDatos[i]>lim)
        {
            lim=listaDatos[i];
        }
    }
    return lim;
}

//Variables globales. Necesarias para SSE
var listaGlobalNumeros;
var listaGlobalFechas;
var anchuraGlobalIntervalo;

//WRAPPERS PARA MANTENER VARIABLES GLOBALES
function crearGrafoSimpleNumRnd(elem, datosX, datosY)
{
    //Creo grafo simple
    crearGrafoSimple(elem,datosX,datosY)
    //actualizo variables globales
    listaGlobalFechas=datosX
    listaGlobalNumeros=datosY;
}

function crearGrafoFreqNumRnd(elem,listaNum,intervalo)
{
    //Creo grafo frecuencias
    crearGrafoFreq(elem,listaNum,intervalo);
    //actualizo variables globales
    listaGlobalNumeros = listaNum;
    anchuraGlobalIntervalo = intervalo;
}

//Funciones SSE para actualizar la gráfica simple
function updateGrafoSimpleSSE(datosSSE, divGrafo)
{
    //Solo actualizo si el numero registrado esta disponible en
    //la base de datos que esta empleando el usuario
    if(estaNumeroDisponibleSSE(datosSSE))
    {
        //Parseo datos SSE
        //numero aleatorio
        var num = getNumeroAleatorioSSE(datosSSE);
        //fechams
        var fechams = getFechaSSE(datosSSE);
        //fecha datetime
        var fecha = dateToDatetime(fechams);
        //Actualizo variables globales
        listaGlobalNumeros.push(num);
        listaGlobalFechas.push(fecha);

        //Genero tabla actualizada.
        //Llamo crearGrafoSimple() en lugar
        //de crearGrafoSimpleNumRnd() porque
        //no necesito actualizar las varaibles globales
        //porque ya lo estan.
        crearGrafoSimple(divGrafo, listaGlobalFechas, listaGlobalNumeros);
    }
}

//Funciones SSE para actualizar la gráfica de frecuencias
function updateGrafoFreqSSE(datosSSE, divGrafo)
{
    //Solo actualizo si el numero registrado esta disponible en
    //la base de datos que esta empleando el usuario
    if(estaNumeroDisponibleSSE(datosSSE))
    {
        //Solo actualizo gráfica si la var global no esta
        //indefinida. Si esta indefinida significa que el 
        //cliente no ha definido intervalo por lo que no se ha generado
        //la gráfica de frecuencias todavía, por lo tanto no tendrá sentido
        //actualizar una gráfica que no existe.
        if(anchuraGlobalIntervalo != undefined)
        {

            //Parseo datos SSE
            //numero aleatorio
            var num = getNumeroAleatorioSSE(datosSSE);
            //fechams
            var fechams = getFechaSSE(datosSSE);
            //fecha datetime
            var fecha = dateToDatetime(fechams);
            //Esta funcion se llamara a continuacion de actualizar
            //el otro grafo simple, por lo que las variables globales 
            //ya estrán actualizadas.
            //Comprobaré si estan actualizadas, y en ese caso no
            //añado el numero y la fecha obtenidas del SSE.
            var last = listaGlobalFechas.length - 1;
            if(listaGlobalFechas[last]!=fecha)
            {
                //Actualizo variables globales
                listaGlobalNumeros.push(num);
                listaGlobalFechas.push(fecha);
            }

            //Genero tabla actualizada.
            //Llamo crearGrafoSimple() en lugar
            //de crearGrafoSimpleNumRnd() porque
            //no necesito actualizar las varaibles globales
            //porque ya lo estan.
            crearGrafoFreq(divGrafo, listaGlobalNumeros, anchuraGlobalIntervalo);
        }
    }
}

//-----------------------------------------------------------------------------
//RESIZE
//Añade el elemento a la lista si no esta presente
function addElemToGlobalList(elem,list)
{
    var idElem = elem.id;
    var yaEstaIncluido = false;
    for(i in list)
    {
        if(list[i].id == idElem)
        {
            yaEstaIncluido = true;
        }
    }
    if(!yaEstaIncluido)
    {
        list.push(elem);
    }
}

//Redimensiona graficas de los elementos en la lista
//global con los elementos que contienen graficas.
function redimensionar()
{
    /*
    console.log("lista elem.: " + listaGlobalElementos);
    for(i in listaGlobalElementos)
    {
        console.log("elem " + i + " : " + listaGlobalElementos[i].id);
    }
    */
    //selector
    var d3 = Plotly.d3;
    /*Por cada elemento en la lista de elementos (elementos que 
    contienen gráficas), lo selecciono y redimensiono*/
    for(i in listaGlobalElementos)
    {
        //Selecciono elemento
        var grafica = d3.select("#" + listaGlobalElementos[i].id).node();
        //Redimension
        Plotly.Plots.resize(grafica);
    }
}

/*Ejecuto la función anterior cada vez que se cambia el tamaño de la ventana.*/
window.onresize = function() {
    redimensionar();
};

//-----------------------------------------------------------------------------
//LAYOUTS. Funciones para obtener los layouts para las gráficas de los números
//y las frecuencias.

/*Devuelve layout para la gráfica simple
con los números registrados en la base de datos.*/
function getScatterLayout()
{
    //Layout
    var myLayout = {
        //Margenes
        margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,
            pad: 2
        },
        title: "Números Registrados",
        font: {
            family: 'Helvetica',
            size: 20,
            color: 'black'
        },
        xaxis: {
			title: 'Fecha',
			titlefont: {
			  family: 'Helvetica',
			  size: 18,
			  color: '#4CAF50'
			},
			//Oculto fehcas en el eje X
			showticklabels: true,
			tickfont: {
			  family: 'Helvetica',
			  size: 14,
			  color: 'black'
			},
            tickangle: 20,
            dtick: 10,
            ticklen: 8,
            tickwidth: 4,
            tickcolor: '#000',
			showgrid: true,
            zerolinewidth: 1,
            zerolinecolor: '#000',
            gridwidth: 1,
            gridcolor: '#000'
        },
        yaxis: {
            zerolinewidth: 2,
            zerolinecolor: '#ff0000',
            gridwidth: 2,
            gridcolor: '#ff0000',
			title: 'Número',
			titlefont: {
			  family: 'Helvetica',
			  size: 18,
			  color: '#4CAF50'
			},
			showticklabels: true,
			//tickangle: 45,
			tickfont: {
			  family: 'Helvetica',
			  size: 14,
			  color: 'black'
			}
  		}
    };
    return myLayout
}
/*Devuelve layout para la gráfica de frecuencias
con los números registrados en la base de datos.*/
function getFreqLayout()
{
    //Layout
    var myLayout = {
        title: "Intervalos",
        font: {
            family: 'Helvetica',
            size: 20,
            color: 'black'
        },
        xaxis: {
			title: 'Intervalo',
			titlefont: {
			  family: 'Helvetica',
			  size: 18,
			  color: '#4CAF50'
			},
			showticklabels: true,
			//tickangle: 45,
			tickfont: {
			  family: 'Helvetica',
			  size: 14,
			  color: 'black'
			}
        },
        yaxis: {
            zerolinewidth: 1,
            zerolinecolor: '#000',
            gridwidth: 1,
            gridcolor: '#000',
			title: 'Frecuencia',
			titlefont: {
			  family: 'Helvetica',
			  size: 18,
			  color: '#4CAF50'
			},
			showticklabels: true,
			//tickangle: 45,
			tickfont: {
			  family: 'Helvetica',
			  size: 14,
			  color: 'black'
			}
  		}
    };
    return myLayout
}
