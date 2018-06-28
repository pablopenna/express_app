app.controller('MainCtrl', function ($scope, $http, entriesService, urlService, debugService) {
    $scope.address = 'placeholder';
    $scope.lblMsg = null;
    //Vinculo Servicio con variable del controlador
    //para poder acceder a los recursos del primero.
    //$scope.entries = entriesService.entries;
    $scope.entriesService = entriesService;

    $scope.urlService = urlService;

    $scope.debugService = debugService;

    //Variable que indica si se quieren mostrar datos de DEBUG o no
    $scope.showDebug=true;
    $scope.switchDebug = function()
    {
        $scope.showDebug = !$scope.showDebug;
    }

    //DEBUG. para mostrar parse de la url.
    $scope.debugURL = function(url)
    {
        $scope.debuggedURL = $scope.urlService.checkURL(url);
    }
    
/*
  ____                            _       
 |  _ \ ___  __ _ _   _  ___  ___| |_ ___ 
 | |_) / _ \/ _` | | | |/ _ \/ __| __/ __|
 |  _ <  __/ (_| | |_| |  __/\__ \ |_\__ \
 |_| \_\___|\__, |\__,_|\___||___/\__|___/
               |_|                      
*/    

    /**Wrapper */
    /**Recibo también la id de la entrada (se supone que es clave primaria), de forma que puedo
     * acceder a la entrada que le corresponde en $scopes,entries para almacenar en ellas
     * los datos oportunos (respuestas local y remota).
     */
    $scope.enviarPeticion = function(id,url)
    {
        var data = $scope.urlService.checkURL(url);
        //Petición Remota
        var miUrl = data['protocol']+data['host']+data['pathname'];
        $scope.postdata(id,miUrl);
        //Petición Local
        var localUrl = data['protocol']+'localhost:3000'+data['pathname'];
        $scope.postdata(id,localUrl);
        //Ambas respuestas se han registrado dentro de la funcion postdata().
        //Se emplean las variables $scope.localResponse y $scope.remoteResponse
        //para almacenar las respuestas recibidas.    
    }

    /**Envío de datos.
     * Recibe como parametros.
     * - La id de la entrada, para poder almacenar en 'entries' las
     * respuestas a sus peticiones.
     * - La url a la que enviar la peticion POST.
     */
    $scope.postdata = function (id,url) {
        console.log("postdata() - url: " + url);
        //Call the services 
        //$http.post('/ops/mediaLluvia')
        $http.post(url)
        .then(function onSuccess(response) 
        {
            if (response.data)
            {
                //DEBUG---
                $scope.debugService.msg = "Post Data Submitted Successfully!";
                $scope.debugService.statusval = response.status;
                $scope.debugService.statustext = response.statusText;
                $scope.debugService.headers = response.headers();
                $scope.debugService.resData = response.data;
                //---------
                $scope.registrarRespuesta(id, response, $scope.compararRespuestas);
            }
        },
        function onError(response) 
        {
            //DEBUG---
            $scope.debugService.msg = "Service not Exists";
            $scope.debugService.statusval = response.status;
            $scope.debugService.statustext = response.statusText;
            $scope.debugService.headers = response.headers();
            $scope.debugService.resData = response.data;
            //---------
            $scope.registrarRespuesta(id, response, $scope.compararRespuestas);
        });
    };

    /**Dependiendo de si la respuesta es a una 
     * petición a la misma máquina o a otra, 
     * registra la respuesta en una variable u otra.
     * Recibe una función callback. De esta forma,
     * puedo pasar la funcion comparar respuestas
     * opcionalmente para compararlas tras haberlas registrado.
     * Tengo que hacerlo de esta forma para que sea sincrono,
     * es decir, que se comparen las respuestas tras
     * haberlas registrado.
     */
    $scope.registrarRespuesta = function(id, response, callback)
    {
        //Local o Remota
        const url = response.config.url;
        console.log('la url: ' + url);
        if($scope.urlService.isLocalUrl(url))
        {
            $scope.entriesService.setEntryLocalResponse(id,response);
        }
        else
        {
            $scope.entriesService.setEntryRemoteResponse(id,response);
        }
        if(typeof callback == "function")
        {
            callback(id);
        }
    }

    /**Función empleada para comparar las respuestas recibidas:
     * local y remota.
     * Recibe el id de la entrada para poder obtener 
     * las respuestas que tiene almacenadas y compararlas
     */
    $scope.compararRespuestas = function(id)
    {
        const resp1 = JSON.stringify($scope.entriesService.getEntryLocalResponse(id));
        const resp2 = JSON.stringify($scope.entriesService.getEntryRemoteResponse(id));
        console.log("json resp1: " + resp1);
        console.log("json resp2: " + resp2);
        console.log("iguales: " + (resp1==resp2));
        const areRespEqual = resp1 == resp2;
        $scope.entriesService.setEntryResponseComp(id, areRespEqual);
    }

    


    //----------------
    /*
    $scope.testGraph = function()
    {
        //var TESTER = document.getElementById('tester');
        //PLOTLY necesita recibir el id del elemento DOM que
        //va a emplear para dibujar la gráfica.
        //En este caso le indicaremos el id del 
        //elemento deseado con la variable 
        //$scope.TESTER.
        $scope.TESTER = 'tester';
        console.log("graph - " + $scope.TESTER);
        Plotly.plot( $scope.TESTER, [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16] }], {
        margin: { t: 0 } } );
    }
    */

});