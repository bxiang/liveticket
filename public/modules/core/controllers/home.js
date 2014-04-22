'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', function ($scope, Authentication) {
    $scope.authentication = Authentication;

    $scope.map = {
	    center: {
	        latitude: 43.77394,
	        longitude: -79.40845
	    },
	    zoom: 16,
		myMarker: {
			latitude:43.77394,
			longitude:-79.40845,
			showWindow:false,
			title:"My Marker"
		}
	};
}]);