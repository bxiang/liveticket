'use strict';

//Imaps service used to communicate Imaps REST endpoints
angular.module('imaps').factory('Imaps', ['$resource', function($resource) {
    return $resource('imaps/:imapId', {
        imapId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);