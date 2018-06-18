app.controller('MainCtrl', function ($scope, $http) {
    $scope.address = 'placeholder';
    $scope.lblMsg = null;
    $scope.postdata = function () {
        //Call the services 
        //$http.post('/ops/mediaLluvia')
        $http.post($scope.address)
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
});