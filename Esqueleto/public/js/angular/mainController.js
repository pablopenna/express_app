app.controller('MainCtrl', function ($scope, $http) {
    $scope.address = 'placeholder';
    $scope.lblMsg = null;
    /**Envío de datos */
    $scope.postdata = function (url) {
        //Call the services 
        //$http.post('/ops/mediaLluvia')
        $http.post(url)
        .then(function onSuccess(response) 
        {
            if (response.data)
            {
                $scope.msg = "Post Data Submitted Successfully!";
                $scope.resData = response.data;
            }
        },
        function onError(response) 
        {
            $scope.msg = "Service not Exists";
            $scope.statusval = response.status;
            $scope.statustext = response.statusText;
            $scope.headers = response.headers();
        });
    };
    /**Entradas */
    $scope.entryCounter=0;
    /**Definimos unicamente los atributos que 
     * queremos que posea cada entrada de 'entries' 
     * (modelo).
     * No influye en la estructura del html (vista).
     */
    $scope.entries = [{ id : 'defaultEntry', url : 'xxx'}];
    //$scope.entries = [{url : 'xxx'}];
    $scope.addEntry = function() {
        //atributos de la entrada a añadir (modelo)
        $scope.inputTemplate = {
            /**Necesitamos id porque se utiliza en la
             * cláusula ng-repeat en la vista.
             */
            id: 'entry-' + $scope.entryCounter,
            //name: '',
            /**Por ejemplo, al añadir este
             * atributo 'custom' el div que se corresponda
             * a la nueva entrada creada no poseerá este 
             * atributo en el html (vista).
             */
            //custom: 'yeahboi',
            url: 'new'
        };
        $scope.entryCounter += 1;
        $scope.entries.push($scope.inputTemplate);
    };
});