/**Servicio para trabajar y (SOBRE TODO) almacenar
 * los datos de las diferentes entradas del menú de la 
 * aplicación. Al ser un servicio puede ser accedido
 * por diferentes controladores
 */
app.service('entriesService',function()
{
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

    /*
    this.entries = [{ id : 'defaultEntry', 
    url : '127.0.0.1/ops/random',
    localResponse : 'placeholder',
    remoteResponse : 'placeholder',
    areRespEqual : false}];
    */
    //Lista que contiene datos de todas las entradas
    this.entries = [];
    //Contador de entradas. Se emplea para crear id unico.
    this.entryCounter=0;
    
    /**Añade tantas entradas a la
     * lista 'entries' como indique
     * la var 'counter'.*/
    this.initEntries = function(counter)
    {
        for(i=0;i<counter;i++)
        {
            this.addEntry();
        }
    }

    /**Añade una entrada al array 'entries' creando
     * una nueva entrada en el menú.
     */
    this.addEntry = function() {
        //atributos de la entrada a añadir (modelo)
        this.inputTemplate = {
            /**Necesitamos id porque se utiliza en la
             * cláusula ng-repeat en la vista.
             */
            id: 'entry-' + this.entryCounter,
            //---
            periodo: 'placeholder',
            operacion: 'placeholder',
            campo: 'placeholder',
            //---
            //name: '',
            /**Por ejemplo, al añadir este
             * atributo 'custom' el div que se corresponda
             * a la nueva entrada creada no poseerá este 
             * atributo en el html (vista).
             */
            //custom: 'yeahboi',
            url: '127.0.0.1/ops/random',
            localResponse : {},
            remoteResponse : {},
            areRespEqual : false
        };
        this.entryCounter += 1;
        this.entries.push(this.inputTemplate);
    };

    /**Recibe la id de una de las entradas del menú.
     * Borrará la entrada con esa id.
     */
    this.deleteEntry = function(id) {
        //this.entries es una lista de objetos.
        //Debemos buscar la entrada de 'entries'
        //que tenga como propiedad 'id' la id
        //que queremos borrar
        for(i in this.entries)
        {
            var element = this.entries[i]
            if(this.entries[i]['id'] == id)
            {
                //SI coincide, borramos entrada
                //de la lista. Como borramos un 
                //elemento de un Array utilizamos
                //el método splice()
                //array.splice(index, howmany)
                this.entries.splice(i,1);
            }
        }
    }

     /**GETTERS Y SETTERS */

     /**Set generico */
     this.setEntryAttr = function(id, attr, valor)
     {
        //this.entries es una lista de objetos.
        //Debemos buscar la entrada de 'entries'
        //que tenga como propiedad 'id' la id
        //que queremos borrar
        for(i in this.entries)
        {
            var element = this.entries[i]
            if(this.entries[i]['id'] == id)
            {
                //SI coincide, en entries[i]
                //tendremos la entrada con la
                //id especificada
                this.entries[i][attr]=valor;
            }
        }
     }

     /**Get generico */
     this.getEntryAttr = function(id, attr)
     {
         //this.entries es una lista de objetos.
         //Debemos buscar la entrada de 'entries'
         //que tenga como propiedad 'id' la id
         //que queremos borrar
         for(i in this.entries)
         {
             var element = this.entries[i]
             if(this.entries[i]['id'] == id)
             {
                 //SI coincide, en entries[i]
                 //tendremos la entrada con la
                 //id especificada
                 return this.entries[i][attr];
             }
         }
     }

     //SET
    /**Recibe la id de la entrada a la que se le va a añadir
     * respuesta local.
     */
    this.setEntryLocalResponse = function(id,response)
    {
        this.setEntryAttr(id,'localResponse',response.data);
    }

    /**Recibe la id de la entrada a la que se le va a añadir
     * respuesta remota.
     */
    this.setEntryRemoteResponse = function(id,response)
    {
        this.setEntryAttr(id,'remoteResponse',response.data);
    }

    /**Asigna valor a la variable de la entrada
     * que indica si las respuestas son iguales.
      */
    this.setEntryResponseComp = function(id,areEqual)
    {
        this.setEntryAttr(id,'areRespEqual',areEqual);
    }

    //GET
    this.getEntryLocalResponse = function(id)
    {
        return this.getEntryAttr(id,'localResponse');
    }

    /**Recibe la id de la entrada a la que se le va a añadir
     * respuesta remota.
     */
    this.getEntryRemoteResponse = function(id)
    {
        return this.getEntryAttr(id,'remoteResponse');
    }

    /**Devuelve valor a la variable de la entrada
     * que indica si las respuestas son iguales.
      */
     this.getEntryResponseComp = function(id)
     {
        return this.getEntryAttr(id,'areRespEqual');
     }

});