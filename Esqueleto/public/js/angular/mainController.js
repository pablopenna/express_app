app.controller('MainCtrl', function ($scope, $http) {
    $scope.address = 'placeholder';
    $scope.lblMsg = null;

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
        var data = $scope.checkURL(url);
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
                $scope.msg = "Post Data Submitted Successfully!";
                $scope.statusval = response.status;
                $scope.statustext = response.statusText;
                $scope.headers = response.headers();
                $scope.resData = response.data;
                //
                $scope.registrarRespuesta(id, response, $scope.compararRespuestas);
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
        if($scope.isLocalUrl(url))
        {
            $scope.setEntryLocalResponse(id,response);
        }
        else
        {
            $scope.setEntryRemoteResponse(id,response);
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
        const resp1 = JSON.stringify($scope.getEntryLocalResponse(id));
        const resp2 = JSON.stringify($scope.getEntryRemoteResponse(id));
        console.log("json resp1: " + resp1);
        console.log("json resp2: " + resp2);
        console.log("iguales: " + (resp1==resp2));
        const areRespEqual = resp1 == resp2;
        $scope.setEntryResponseComp(id, areRespEqual);
    }

    /*
     _____       _        _           
    | ____|_ __ | |_ _ __(_) ___  ___ 
    |  _| | '_ \| __| '__| |/ _ \/ __|
    | |___| | | | |_| |  | |  __/\__ \
    |_____|_| |_|\__|_|  |_|\___||___/
                                   
    */
    //ENTRIES
    //------------------------------------------------------------------
    /**Entradas */
    $scope.entryCounter=0;
    /**Definimos unicamente los atributos que 
     * queremos que posea cada entrada de 'entries' 
     * (modelo).
     * No influye en la estructura del html (vista).
     * - id: identificador unico de la entrada
     * - url: url a la que la entrada hace referencia
     * para enviar la peticion
     * - localResponse: respuesta a la petición local.
     * - remoteResponse: respuesta a la petición remota.
     * - areRespEqual: indica si las dos respuestas son iguales
     */
    $scope.entries = [{ id : 'defaultEntry', 
    url : 'xxx',
    localResponse : 'placeholder',
    remoteResponse : 'placeholder',
    areRespEqual : false}];

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
            url: 'new',
            localResponse : 'placeholder',
            remoteResponse : 'placeholder',
            areRespEqual : false
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

    //SET
    /**Recibe la id de la entrada a la que se le va a añadir
     * respuesta local.
     */
    $scope.setEntryLocalResponse = function(id,response)
    {
        //$scope.entries es una lista de objetos.
        //Debemos buscar la entrada de 'entries'
        //que tenga como propiedad 'id' la id
        //que queremos borrar
        for(i in $scope.entries)
        {
            var element = $scope.entries[i]
            if($scope.entries[i]['id'] == id)
            {
                //SI coincide, en entries[i]
                //tendremos la entrada con la
                //id especificada
                $scope.entries[i]['localResponse']=response.data;
            }
        }
    }

    /**Recibe la id de la entrada a la que se le va a añadir
     * respuesta remota.
     */
    $scope.setEntryRemoteResponse = function(id,response)
    {
        //$scope.entries es una lista de objetos.
        //Debemos buscar la entrada de 'entries'
        //que tenga como propiedad 'id' la id
        //que queremos borrar
        for(i in $scope.entries)
        {
            var element = $scope.entries[i]
            if($scope.entries[i]['id'] == id)
            {
                //SI coincide, en entries[i]
                //tendremos la entrada con la
                //id especificada
                $scope.entries[i]['remoteResponse']=response.data;
            }
        }
    }

    /**Asigna valor a la variable de la entrada
     * que indica si las respuestas son iguales.
      */
    $scope.setEntryResponseComp = function(id,areEqual)
    {
        //$scope.entries es una lista de objetos.
        //Debemos buscar la entrada de 'entries'
        //que tenga como propiedad 'id' la id
        //que queremos borrar
        for(i in $scope.entries)
        {
            var element = $scope.entries[i]
            if($scope.entries[i]['id'] == id)
            {
                //SI coincide, en entries[i]
                //tendremos la entrada con la
                //id especificada
                $scope.entries[i]['areRespEqual']=areEqual;
            }
        }
    }

    //GET
    $scope.getEntryLocalResponse = function(id)
    {
        //$scope.entries es una lista de objetos.
        //Debemos buscar la entrada de 'entries'
        //que tenga como propiedad 'id' la id
        //que queremos borrar
        for(i in $scope.entries)
        {
            var element = $scope.entries[i]
            if($scope.entries[i]['id'] == id)
            {
                //SI coincide, en entries[i]
                //tendremos la entrada con la
                //id especificada
                return $scope.entries[i]['localResponse'];
            }
        }
    }

    /**Recibe la id de la entrada a la que se le va a añadir
     * respuesta remota.
     */
    $scope.getEntryRemoteResponse = function(id)
    {
        //$scope.entries es una lista de objetos.
        //Debemos buscar la entrada de 'entries'
        //que tenga como propiedad 'id' la id
        //que queremos borrar
        for(i in $scope.entries)
        {
            var element = $scope.entries[i]
            if($scope.entries[i]['id'] == id)
            {
                //SI coincide, en entries[i]
                //tendremos la entrada con la
                //id especificada
                return $scope.entries[i]['remoteResponse'];
            }
        }
    }

    /**Devuelve valor a la variable de la entrada
     * que indica si las respuestas son iguales.
      */
     $scope.getEntryResponseComp = function(id)
     {
         //$scope.entries es una lista de objetos.
         //Debemos buscar la entrada de 'entries'
         //que tenga como propiedad 'id' la id
         //que queremos borrar
         for(i in $scope.entries)
         {
             var element = $scope.entries[i]
             if($scope.entries[i]['id'] == id)
             {
                 //SI coincide, en entries[i]
                 //tendremos la entrada con la
                 //id especificada
                 $scope.entries[i]['areRespEqual'];
             }
         }
     }

    //------------------------------------------------------------------
    /*
     _   _ ____  _         
    | | | |  _ \| |    ___ 
    | | | | |_) | |   / __|
    | |_| |  _ <| |___\__ \
     \___/|_| \_\_____|___/
                        
    */
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


    //----------------
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

});