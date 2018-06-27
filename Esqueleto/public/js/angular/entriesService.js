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
    this.entryCounter=0;
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
    this.entries = [{ id : 'defaultEntry', 
    url : 'xxx',
    localResponse : 'placeholder',
    remoteResponse : 'placeholder',
    areRespEqual : false}];

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

    //SET
    /**Recibe la id de la entrada a la que se le va a añadir
     * respuesta local.
     */
    this.setEntryLocalResponse = function(id,response)
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
                this.entries[i]['localResponse']=response.data;
            }
        }
    }

    /**Recibe la id de la entrada a la que se le va a añadir
     * respuesta remota.
     */
    this.setEntryRemoteResponse = function(id,response)
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
                this.entries[i]['remoteResponse']=response.data;
            }
        }
    }

    /**Asigna valor a la variable de la entrada
     * que indica si las respuestas son iguales.
      */
    this.setEntryResponseComp = function(id,areEqual)
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
                this.entries[i]['areRespEqual']=areEqual;
            }
        }
    }

    //GET
    this.getEntryLocalResponse = function(id)
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
                return this.entries[i]['localResponse'];
            }
        }
    }

    /**Recibe la id de la entrada a la que se le va a añadir
     * respuesta remota.
     */
    this.getEntryRemoteResponse = function(id)
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
                return this.entries[i]['remoteResponse'];
            }
        }
    }

    /**Devuelve valor a la variable de la entrada
     * que indica si las respuestas son iguales.
      */
     this.getEntryResponseComp = function(id)
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
                 this.entries[i]['areRespEqual'];
             }
         }
     }
});