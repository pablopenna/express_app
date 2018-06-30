app.factory('graphService', ['entriesService',function (entriesService) {

    var factory = {};

    /*ID del elemento en el que dibujaré la gráfica.
    También definimos get y set.*/
    factory.graphElem = 'tester';
    factory.setGraphElem = function(elemId)
    {
        factory.graphElem = elemId;
    }
    factory.getGraphElem = function()
    {
        return factory.graphElem;
    }

    /*Función para dibujar una gráfica de prueba. */
    factory.testGraph = function()
    {
        //var TESTER = document.getElementById('tester');
        //PLOTLY necesita recibir el id del elemento DOM que
        //va a emplear para dibujar la gráfica.
        //En este caso le indicaremos el id del 
        //elemento deseado con la variable 
        //$scope.TESTER.
        //const TESTER = 'tester';
        console.log("graph - " + factory.graphElem);
        //Plotly.newPlot. Limpia grafo y añade traza
        //Plotly.plot. Añade traza conservando las anteriores.
        Plotly.newPlot( factory.graphElem, [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16] }], {
        margin: { t: 0 } } );
    }

    /*
    NO SE EMPLEA.
    Crea una gráfica simple con los datos recibidos en el elemento elem.
    Gráfica de líneas.
        -> elem es el elemento html en el que escribiremos
        la gráfica
        -> datosX es una lista con los datos del ejeX.
        -> datosY es una lista con los datos del ejeY.
        -> (Opcional) Tipo de gráfica (líneas, barras, ...).
        -> (Opcional) Modo.
        -> (Opcional) Layout de la gráfica.
    */
   factory.crearGrafica = function(elem, datosX, datosY, tipo,
    modo, myLayout = {margin:{t:0}} )
   {
       var trace1 = {
           x: datosX,
           y: datosY,
           type: tipo
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

    /*
    Función que obtiene los datos de las respuestas a partir del 
    entriesService. Estos datos los parsea y llama a la funcion
    crearGraficaComp con ellos.
        -> ind: id de la entrada de la cual obtendremos
        los datos para dibujar la gráfica.
    */
    factory.dibujarGraficaRespuestas = function(ind)
    {
        console.log("indice - " + ind);
        
        //Datos locales
        var localRes = entriesService.getEntryLocalResponse(ind);
        var datosXlocal = localRes['op'];
        var datosYlocal = localRes['res'];
        var fixedData = factory.fixGraphData(datosXlocal,datosYlocal)
        datosXlocal = fixedData[0];
        datosYlocal = fixedData[1];

        //Datos remotos
        var remoteRes = entriesService.getEntryRemoteResponse(ind);
        var datosXremoto = remoteRes['op'];
        var datosYremoto = remoteRes['res'];
        fixedData = factory.fixGraphData(datosXremoto,datosYremoto)
        datosXremoto = fixedData[0];
        datosYremoto = fixedData[1];

        //DEBUG
        //datosXremoto[0] = datosXremoto[0] + "Remoto";

        console.log("datos - " + fixedData);
        console.log("datosX - " + datosXlocal);
        console.log("datosY - " + datosYlocal);
        console.log("datosXr - " + datosXremoto);
        console.log("datosYr - " + datosYremoto);
        

        var myLayout = factory.getScatterLayout();
        //factory.crearGrafica(factory.graphElem,datosX,datosY,'scatter','markers', myLayout);
        factory.crearGraficaComp(factory.graphElem,datosXlocal,datosYlocal,
            datosXremoto,datosYremoto,'bar',myLayout);
    }

    /*
    Crea una gráfica para mostrar la diferencia entre dos conjuntos
    de datos. Cada conjunto de datos se compone de los datos del eje X y
    el eje Y.
        -> elem es la id de elemento html en el que dibujaremos
        la gráfica
        -> datosXa es una lista con los datos del ejeX del conjunto de datos A.
        -> datosYa es una lista con los datos del ejeY del conjunto de datos A.
        -> datosXb es una lista con los datos del ejeX del conjunto de datos B.
        -> datosYb es una lista con los datos del ejeY del conjunto de datos B.
        -> (Opcional) Tipo de gráfica (líneas, barras, ...).
        -> (Opcional) Layout de la gráfica.
    */
    factory.crearGraficaComp = function(elem, datosXa, datosYa,
        datosXb, datosYb, tipo='bar', myLayout = {margin:{t:0}} )
    {
        var traceA = {
            x: datosXa,
            y: datosYa,
            type: tipo,
            name: 'local'
            //Para color barra
            //,marker: {color: '#000'}
        }

        var traceB = {
            x: datosXb,
            y: datosYb,
            type: tipo,
            name: 'remoto'
            //Para color barra
            //,marker: {color: '#000'}
        }

        var traceC = factory.getDiffTrace(traceA,traceB);
        console.log('trza: ' + traceC);
        //Lista con todas las trazas
        var datos = [traceA, traceB, traceC];
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
    factory.fixGraphData = function(datosX, datosY)
    {
        //PARCHE, si datosY es undefined, le doy el valor 'empty'
        if(datosY==undefined)
        {
            datosY = [0];
        }
        
        if(typeof datosY != "object")
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

        if(typeof datosX != "object")
        {
            //datosY no es una lista. Lo meto en una.
            //Enfocado principalmente a datos Y por si solo
            //hay uno
            datosX = [datosX];
        }

        if(datosX.length < datosY.length)
        {
            var i = datosX.length;
            const originalLabel = datosX[0];
            
            while(i<datosY.length)
            {
                datosX.push(originalLabel+" ["+i+"]");
                i++;
            }
        }

        //Para poder devolver los resultados, los devulevo en una lista [datosX, datosY]
        return [datosX,datosY];
    }

    /*Devuelve la traza que muestra la diferencia entre
    las dos trazas recibidas por paráemtros. */
    factory.getDiffTrace = function(traceA,traceB,tipo='bar')
    {
        console.log("probando datos[a]: " + traceA['x']);
        var traceDiff = {
            x: factory.getDataDiff(traceA['x'],traceB['x']),
            y: factory.getDataDiff(traceA['y'],traceB['y']),
            type: tipo,
            name: 'diff'
            //Para color barra
            ,marker: {color: 'red'}
        } 
        return traceDiff;
    }

    /*Devuelve la lista que muestra la diferencia entre
    las dos listas de datos recibidos. Se emplea para obtener los
    datos X e Y para la traza.*/
    factory.getDataDiff = function(datosA, datosB)
    {
        var datosDiff = [];
        //Obtengo longitud maxima de ambas
        var long = factory.getMax(datosA.length, datosB.length);
        for(i=0;i<long;i++)
        {
            //Asigno la diferencia
            datosDiff[i] = factory.getDiff(datosA[i],datosB[i]);
        }
        return datosDiff;
    }

    /*Dado dos valores, devuelve el máximo.*/
    factory.getMax = function(a,b)
    {
        if(a>b)
        {
            return a;
        }
        else
        {
            return b;
        }
    }

    /*Dados dos valores, devuelve la diferencia de ambos. Maneja
    los casos en los que uno o ambos parámetros esten undefined. */
    factory.getDiff = function(a,b)
    {
        var diff = a-b;
        //si diff es NaN indicara que a o b es undefined.
        if(isNaN(diff))
        {
            //En ese caso asigno el valor que no sea undefined
            diff = a || b;

            //Si aun asi es undefined, le asigno 0
            if(diff == undefined)
            {
                diff = 0;
            }     
        }
        return diff;
    }

    /*Devuelve layout para la gráfica simple
    con los números registrados en la base de datos.*/
    factory.getScatterLayout = function() {
        //Layout
        var myLayout = {
            //agrupadors
            barmode: 'group',
            //Margenes
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 2
            },
            title: "Comparación",
            font: {
                family: 'Helvetica',
                size: 20,
                color: '#373737'
            }
            /*
            ,
            xaxis: {
                title: 'Fecha',
                titlefont: {
                family: 'Helvetica',
                size: 18,
                color: '#DCD0C0'
                },
                //Oculto fehcas en el eje X
                showticklabels: true,
                tickfont: {
                family: 'Helvetica',
                size: 14,
                color: '#373737'
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
                zerolinewidth: 1,
                zerolinecolor: '#373737',
                gridwidth: 1,
                gridcolor: '#373737',
                title: 'Número',
                titlefont: {
                family: 'Helvetica',
                size: 18,
                color: '#DCD0C0'
                },
                showticklabels: true,
                //tickangle: 45,
                tickfont: {
                family: 'Helvetica',
                size: 14,
                color: '#373737'
                }
            }
            */
        };
        return myLayout
    }

    return factory;
}]);
