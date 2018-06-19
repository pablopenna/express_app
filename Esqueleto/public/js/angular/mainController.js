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
    $scope.entries = [{ id : 'defaultEntry', url : 'xxx'}];
    $scope.addEntry = function() {
        $scope.inputTemplate = {
            //id: 'input-' + $scope.entryCounter,
            id: 'input-' + $scope.entryCounter,
            name: '',
            custom: 'yeahboi',
            url: 'new'
        };
        $scope.entryCounter += 1;
        $scope.entries.push($scope.inputTemplate);
    };
});