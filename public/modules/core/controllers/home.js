'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', function ($scope, Authentication) {
    $scope.authentication = Authentication;

	angular.extend($scope, {
        map: {
            center: {
                latitude: 43,
                longitude: -79
            },
            options: {
                streetViewControl: false,
                panControl: false,
                maxZoom: 20,
                minZoom: 3
            },
            zoom: 8,
            dragging: true,
            markers: [
                {
                    latitude: 43.77394,
                    longitude: -79.40845,
                    showWindow: false,
                    title: 'McKee'
                },
                {
                    latitude: 43,
                    longitude: -79,
                    showWindow: false,
                    title: '[43,-79]'
                }
            ]
        }
    });

}]);