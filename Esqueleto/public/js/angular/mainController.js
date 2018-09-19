app.controller('MainCtrl', function ($scope, entriesService, urlService,
    debugService, requestService, graphService, dialogService, requestParamService) {
    $scope.address = 'placeholder';
    $scope.lblMsg = null;

    //Vinculo Servicios con variables del controlador
    //para poder acceder a los recursos de los primeros.

    //Servicio de entradas
    $scope.entriesService = entriesService;
    
    //Servicio de parseo de URLs
    $scope.urlService = urlService;

    //Servicio para manejar variables debug
    $scope.debugService = debugService;

    //Servicio para la realización de peticiones.
    $scope.requestService = requestService;

    //Servicio para la creación de los grafos
    $scope.graphService = graphService;

    //Servicio para utilizar dialogs
    $scope.dialogService = dialogService;

    //Servicio con los diferentes parámetros para realizar peticiones al Back-End
    $scope.requestParamService = requestParamService;

    //Al iniciar el controlador, inicializo el dialogo
    //para su uso posterior.
    $scope.dialogService.initDialog();

    //Función que llama simultáneamente
    //a diversas funciones para:
    //> Crear gráfica con los datos de la entrada cuya id
    //es la recibida como parámetro
    //> Ajustar la gráfica creada al tamaño del dialog.
    //> Mostrar dialog con la gráfica.
    $scope.printGraph = function(id)
    {
        $scope.graphService.dibujarGraficaRespuestas(id);
        $scope.graphService.redimensionar();
        $scope.dialogService.showDialog();
    }

    //Inicializo las entradas (creo initNumEntry entradas)
    $scope.initNumEntry = 1;
    $scope.entriesService.initEntries($scope.initNumEntry);

    //Variable que indica si se quieren mostrar datos de DEBUG o no
    $scope.showDebug=false;
    $scope.switchDebug = function()
    {
        $scope.showDebug = !$scope.showDebug;
    }

    //DEBUG. para mostrar parse de la url.
    $scope.debugURL = function(url)
    {
        $scope.debuggedURL = $scope.urlService.checkURL(url);
    }

});