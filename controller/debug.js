angular.module('exceptionOverride', []).factory('$exceptionHandler', function(){
     return function (exception, cause) {
       fundebug.notifyError(exception)
     };
 });