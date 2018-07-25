app.factory('graphService', ['entriesService',function (entriesService) {

    var factory = {};

    /*ID del elemento en el que dibujaré la gráfica.
    También definimos get y set.*/
    factory.graphElem = 'compGraph';
    factory.setGraphElem = function(elemId)
    {
        factory.graphElem = elemId;
    }
    factory.getGraphElem = function()
    {
        return factory.graphElem;
    }
    /*ID del elemento para dibujar la gráfica de la diferencia. */
    factory.diffGraphElem = 'diffGraph';
    factory.setDiffGraphElem = function(elemId)
    {
        factory.diffGraphElem = elemId;
    }
    factory.getDiffGraphElem = function()
    {
        return factory.diffGraphElem;
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
        //DEBUG
        console.log("entrada empleada para dibujar: - " + ind);
        
        //Datos locales
        var localRes = entriesService.getEntryLocalResponse(ind);
        if(remoteRes == null) remoteRes = {};
        var datosXlocal = localRes['label'];
        var datosYlocal = localRes['data'];
        var fixedData = factory.fixGraphData(datosXlocal,datosYlocal)
        datosXlocal = fixedData[0];
        datosYlocal = fixedData[1];

        //Datos remotos
        var remoteRes = entriesService.getEntryRemoteResponse(ind);
        //En caso de ser null lo inicializo para que no salte error.
        if(remoteRes == null) remoteRes = {};
        var datosXremoto = remoteRes['label'];
        var datosYremoto = remoteRes['data'];
        fixedData = factory.fixGraphData(datosXremoto,datosYremoto)
        datosXremoto = fixedData[0];
        datosYremoto = fixedData[1];

        //DEBUG
        console.log("datos - " + fixedData);
        console.log("datosX - " + datosXlocal);
        console.log("datosY - " + datosYlocal);
        console.log("datosXr - " + datosXremoto);
        console.log("datosYr - " + datosYremoto);
        
        //LAYOUT. La funcion recibe como parámetro el titulop a poner a la grafica.
        //En este caso emplearemos el campo 'descr' de la respuesta.
        //var myLayout = factory.getScatterLayout(datosXlocal[0]);
        var myLayout = factory.getScatterLayout(localRes);
        //Grafica comparativa
        factory.crearGraficaComp(factory.graphElem,datosXlocal,datosYlocal,
            datosXremoto,datosYremoto,'bar',myLayout);
        //Grafica de diferencias
        factory.crearGraficaDiff(factory.diffGraphElem,datosXlocal,datosYlocal,
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
            //Dibujar solo puntos, no lineas
            //,mode: 'markers'
        }

        var traceB = {
            x: datosXb,
            y: datosYb,
            type: tipo,
            name: 'remoto'
            //Para color barra
            //,marker: {color: '#000'}
            //Dibujar solo puntos, no lineas
            //,mode: 'markers'
        }

        //var traceC = factory.getDiffTrace(traceA,traceB,tipo);
        //Lista con todas las trazas
        //var datos = [traceA, traceB, traceC];
        var datos = [traceA, traceB];
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

    /*Recibe los datos de las dos trazas y crea una nueva a partir
    de las diferencias entre ambas. Esta nueva traza se empleará
    para dibujar una gráfica a parte.*/
    factory.crearGraficaDiff = function(elem, datosXa, datosYa,
        datosXb, datosYb, tipo='bar', myLayout = {margin:{t:0}} )
    {
        
        console.log("GRAPHDIFF: ");
        console.log(myLayout);
        //Añado diff al titulo.
        //Creo una copia para no afectar al objecto original
        var clonedLayout = Object.assign({}, myLayout);
        clonedLayout.title = clonedLayout.title + " - DIFF";
        console.log("GRAPHDIFF -title: ");
        console.log(clonedLayout.title);

        var traceA = {
            x: datosXa,
            y: datosYa
        }
        var traceB = {
            x: datosXb,
            y: datosYb
        }
        var traceC = factory.getDiffTrace(traceA,traceB,tipo);
        console.log("TRAZA DIFF: ");
        console.log(traceC);
        //Lista con todas las trazas
        var datos = [traceC];
        //Si se emplea Plotly.plot en lugar de 
        //Plotly.newPlot, la gráfica generada se
        //añadirá a la ya existente en vez de
        //sobrescribirla.
        Plotly.newPlot( 
            elem, 
            datos, 
            //{ margin: { t: 0 } } 
            clonedLayout
        );
    }

    /**FUNCIONES AUXILIARES EMPLEADAS POR LAS ANTERIORES.*/

    /**Recibe los datos (listas) de los ejes X e Y y los
     * comprueba en busca de fallos e intenta arregarlos.
     * Los casos que contempla e intenta arreglar son:
     * - datosX inexistente.
     * - datosY no es una lista (único elemento).
     * Devuelve una lista con dos elementos. El primero
     * se corresponde con los datosX "arreglados" y la
     * segunda posición con los datosY.
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
    las dos trazas recibidas por parámetros.
    Esta traza se empleará para dibujar la gráfica de diferencias.*/
    factory.getDiffTrace = function(traceA,traceB,tipo='line')
    {
        console.log("probando datos[a]: " + traceA['x']);
        var traceDiff = {
            x: factory.getLabelDiff(traceA['x'],traceB['x']),
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
    datos X e Y para la traza. Empleado por getDiffTrace() para
    obtener las diferencias entre datosX y datosY de las
    dos trazas.*/
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

    /*Devuelve la lista que muestra la diferencia entre
    las labels de las dos listas de datos. Empleado por getDiffTrace() para
    obtener las diferencias entre las labels de datosX y datosY de las
    dos trazas.*/
    factory.getLabelDiff = function(datosA, datosB)
    {
        //DatosA son la resp local y datosB la remota
        var datosDiff = [];
        //Obtengo longitud maxima de ambas
        var long = factory.getMax(datosA.length, datosB.length);
        for(i=0;i<long;i++)
        {
            var labelDiff = datosA[i];
            if(labelDiff == undefined)
            {
                labelDiff = datosB[i];
            }
            //puede causar problemas a la hora de que plotly interprete las labels.
            //Si las entradas en la lista de labels son numeros, no introduciremos
            //una cadena ya que plotly no dibujara datos para una label que no
            //sea un numero.
            if(datosA[i] != datosB[i] 
                && datosA[i]!=undefined
                && datosB[i]!=undefined
                && isNaN(parseInt(labelDiff)))
            {
                labelDiff = datosA[i]+" - "+datosB[i];
            }
            //Asigno la diferencia
            datosDiff[i] = labelDiff;
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
        console.log("La diff de " + a + " - " + b + " es: " + diff);
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
    factory.getScatterLayout = function(myTitle = 'Comparación') {
        //Como parametro puede recibir respuesta local con los datos
        //para obtener titulo
        //Si se ha recibido respuesta, saco datos de ella
        if(myTitle != 'Comparación')
        {
            //Si la respuesta tiene campo 'descr',
            //obtenenmos el titulo de ahi
            if(myTitle['descr'] != undefined)
            {
                myTitle = myTitle['descr'];
            }
            else if(myTitle['label']!=undefined &&
                myTitle['label'].length > 0)
            {
                //myTitle['label'] puede ser un string o un array
                if(typeof myTitle['label'] == "string")
                {
                    //string
                    myTitle = myTitle['label'];
                }

                else
                {
                    //array
                    myTitle = myTitle['label'][0];
                }
                
            }
            else
            {
                myTitle = 'Comparación';
            }
        }
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
            title: myTitle,
            font: {
                family: 'Helvetica',
                size: 20,
                color: '#373737'
            }
            ,
            xaxis: {
                //title: 'xaxis',
                titlefont: {
                    family: 'Helvetica',
                    size: 18,
                    color: '#C0B283'
                },
                //Oculto fehcas en el eje X
                showticklabels: true,
                tickfont: {
                    family: 'Helvetica',
                    size: 14,
                    color: '#373737'
                },        
                /*
                tickangle: 20,
                dtick: 10,
                ticklen: 8,
                tickwidth: 4,
                tickcolor: '#000',
                */
                showgrid: false,
                zerolinewidth: 1,
                zerolinecolor: '#000',
                gridwidth: 1,
                gridcolor: '#000'
            },
            yaxis: {
                showgrid: true,
                zerolinewidth: 3,
                zerolinecolor: '#373737',
                gridwidth: 1,
                gridcolor: '#373737',      
                tickfont: {
                    family: 'Helvetica',
                    size: 14,
                    color: '#373737'
                },
            }
            
        };
        return myLayout
    }

    //Redimensionar las gráficas.
    //Redimensiona graficas de los elementos en la lista
    //global con los elementos que contienen graficas.
    factory.redimensionar = function()
    {
        //selector
        var d3 = Plotly.d3;
        //Lista con los identificadores de los elementos
        //que contienen las graficas.
        var listaGraphElem = [factory.graphElem,factory.diffGraphElem]
        /*Por cada elemento en la lista de elementos (elementos que 
        contienen gráficas), lo selecciono y redimensiono*/
        for(i in listaGraphElem)
        {
            //Hay que tener cuidado por si esta funcion se ejecuta cuando
            //las gráficas no se han dibujado. En este caso saltará un
            //error de plotly diciento que 't.layout' no esta definido
            //Sólo redimensiono si se han creado las gráficas.
            if($("#" + listaGraphElem[i]).html().trim() != "")
            {
                //Selecciono elemento
                var grafica = d3.select("#" + listaGraphElem[i]).node();
                //Redimension
                Plotly.Plots.resize(grafica);
            }
        }
    
    }

    return factory;
}]);
