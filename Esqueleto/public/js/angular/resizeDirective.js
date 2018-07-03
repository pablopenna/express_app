/**Directive que se ejecutará al redimensionar la ventana.
 * MUY IMPORTANTE: Al declarar el directive, el nombre se especifica
 * con camel case, pero a la hora de emplearlo en html hay que emplear
 * snakeCase con guiones. Por ejemplo:
 * Declaracion: app.directive('mySuperDir'...
 * Utilizacion: <div ... my-super-dir ...>
 */
app.directive('customResizeDirective', ['$window','graphService',
function ($window, graphService) {
    
    return {
       link: link,
       restrict: 'A'
    };

    function link(scope, element, attrs){

        scope.width = $window.innerWidth;

        /**Funcion que se ejecuta cada vez que se hace un window resize.*/
        angular.element($window).bind('resize', function(){
            console.log("RESIZE!");
            scope.width = $window.innerWidth;
            
            //Redimension graficas
            graphService.redimensionar();

            // manuall $digest required as resize event
            // is outside of angular
            scope.$digest();
        });

    }

}]);