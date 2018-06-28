app.controller('MainCtrl', function ($scope, entriesService, urlService, debugService, requestService) {
    $scope.address = 'placeholder';
    $scope.lblMsg = null;
    //Vinculo Servicio con variable del controlador
    //para poder acceder a los recursos del primero.
    //$scope.entries = entriesService.entries;
    $scope.entriesService = entriesService;

    $scope.urlService = urlService;

    $scope.debugService = debugService;

    $scope.requestService = requestService;

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