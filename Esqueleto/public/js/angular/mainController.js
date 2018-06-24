app.controller('MainCtrl', function ($scope, $http) {
    $scope.address = 'placeholder';
    $scope.lblMsg = null;

    /**Wrapper */
    $scope.enviarPeticion = function(url)
    {
        var data = $scope.checkURL(url);
        //Petición Remota
        var miUrl = data['protocol']+data['host']+data['pathname'];
        $scope.postdata(miUrl);
        //Petición Local
        var localUrl = data['protocol']+'localhost:3000'+data['pathname'];
        $scope.postdata(localUrl);
        //Ambas respuestas se han registrado dentro de la funcion postdata().
        //Se emplean las variables $scope.localResponse y $scope.remoteResponse
        //para almacenar las respuestas recibidas.    
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
                $scope.statusval = response.status;
                $scope.statustext = response.statusText;
                $scope.headers = response.headers();
                $scope.resData = response.data;
                //
                $scope.registrarRespuesta(response, $scope.compararRespuestas);
            }
        },
        function onError(response) 
        {
            $scope.msg = "Service not Exists";
            $scope.statusval = response.status;
            $scope.statustext = response.statusText;
            $scope.headers = response.headers();
            $scope.resData = response.data;
            //
            $scope.registrarRespuesta(response, $scope.compararRespuestas);
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
    $scope.registrarRespuesta = function(response, callback)
    {
        //Local o Remota
        const url = response.config.url;
        console.log('la url: ' + url);
        if($scope.isLocalUrl(url))
        {
            $scope.localResponse = response.data;
        }
        else
        {
            $scope.remoteResponse = response.data;
        }
        if(typeof callback == "function")
        {
            callback();
        }
    }

    /**Función empleada para comparar las respuestas recibidas:
     * local y remota.
     */
    $scope.compararRespuestas = function()
    {
        const resp1 = JSON.stringify($scope.localResponse);
        const resp2 = JSON.stringify($scope.remoteResponse);
        console.log("json resp1: " + resp1);
        console.log("json resp2: " + resp2);
        console.log("iguales: " + (resp1==resp2));
        $scope.areRespEqual = resp1 == resp2;
    }

    //ENTRIES
    //------------------------------------------------------------------
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
    //------------------------------------------------------------------
    //URLS
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

        return data;
    }

    /**Recibe la salida de la funcion parseURL y añade campos si faltan */
    $scope.fixURLData = function(data)
    {
        //Tengo que añadir 'http://' para que el post se envía
        //a otra máquina (cross domain POST).
        //http://192.168.1.38:3000/ops/mediaLluvia -> Se envia POST correctamente
        //192.168.1.38:3000/ops/mediaLluvia -> Se envia POST a  localhost:3000/192.168.1.38:3000/ops/mediaLluvia
        //Compruebo si hay campos vacios.
        //Si no se especifica protocolo doy por sentado que es http
        if(data['protocol']==undefined || data['protocol']=='')
        {
            data.protocol='http://';
        }
        //Si no se especifica hostname doy por sentado que es localhost
        if(data['hostname']==undefined || data['hostname']=='')
        {
            data['hostname']='localhost';
        }
        //Si no se especifica puerto doy por sentado que es 80
        if(data['port']==undefined || data['port']=='')
        {
            data['port']='3000';
        }
        data['host']= data['hostname']+':'+data['port'];

        return data;
    }

    /**Envoltorio de las dos funcione sprevias */
    $scope.checkURL = function(url)
    {
        var data = $scope.parseURL(url);
        data = $scope.fixURLData(data);
        //DEBUG---
        $scope.parsedURL = data;
        //---
        return data;
    }

    /**Función que determina si una url se refiere a
     * la máquina local o no. SImplemente
     * compruebo si el hostname es 'localhost'
     */
    $scope.isLocalUrl = function(url)
    {
        var urlData = $scope.parseURL(url);
        return urlData['hostname']=='localhost';
    }
});