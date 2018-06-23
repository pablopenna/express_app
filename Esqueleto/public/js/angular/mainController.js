app.controller('MainCtrl', function ($scope, $http) {
    $scope.address = 'placeholder';
    $scope.lblMsg = null;

    /**Wrapper */
    $scope.enviarPeticion = function(url)
    {
        const data = $scope.parseURL(url);
        //Tengo que añadir 'http://' para que el post se envía
        //a otra máquina (cross domain POST).
        //http://192.168.1.38:3000/ops/mediaLluvia -> Se envia POST correctamente
        //192.168.1.38:3000/ops/mediaLluvia -> Se envia POST a  localhost:3000/192.168.1.38:3000/ops/mediaLluvia

        var miURL = 'http://' + data['host']+data['pathname'];
        //var miURL = '10.0.0.1:3000/ops/media';
        //console.log('MIURL: ' + miURL);
        $scope.postdata(miURL);
    }

    /**Envío de datos */
    $scope.postdata = function (url) {
        console.log("postdata() - url: " + url);
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
    /**Añade una entrada al array 'entries' creando
     * una nueva entrada en el menú.
     */
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
    /**Recibe la id de una de las entradas del menú.
     * Borrará la entrada con esa id.
     */
    $scope.deleteEntry = function(id) {
        //$scope.entries es una lista de objetos.
        //Debemos buscar la entrada de 'entries'
        //que tenga como propiedad 'id' la id
        //que queremos borrar
        for(i in $scope.entries)
        {
            var element = $scope.entries[i]
            if($scope.entries[i]['id'] == id)
            {
                //SI coincide, borramos entrada
                //de la lista. Como borramos un 
                //elemento de un Array utilizamos
                //el método splice()
                //array.splice(index, howmany)
                $scope.entries.splice(i,1);
            }
        }
    }

    /**Para parsear una cadena y sacar info si es URL */
    $scope.parseURL = function(href) {
        var match = href.match(/^((https?\:)\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
        var data = {
            href: href,
            protocol: match[2],
            host: match[3],
            hostname: match[4],
            port: match[5],
            pathname: match[6],
            search: match[7],
            hash: match[8]
            //Los relevantes en mi caso
            //son hostname, port y pathname
            //hostname + port = host
            //host + pathname = miUrl
        };
        $scope.parsedURL = data;
        return data;
    }
});