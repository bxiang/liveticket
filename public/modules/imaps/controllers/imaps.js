'use strict';

// Imaps controller
angular.module('imaps').controller('ImapsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Imaps',
    function($scope, $stateParams, $location, Authentication, Imaps) {
        $scope.authentication = Authentication;

        // Create new Imap
        $scope.create = function() {
        	// Create new Imap object
            var imap = new Imaps({
                name: this.name,
                latitude: this.latitude,
                longitude: this.longitude
            });

            // Redirect after save
            imap.$save(function(response) {
                $location.path('imaps/' + response._id);
            });

            // Clear form fields
            this.name = '';
            this.latitude = null;
            this.longitude = null;
        };

        // Remove existing Imap
        $scope.remove = function(imap) {
            if (imap) {
                imap.$remove();

                for (var i in $scope.imaps) {
                    if ($scope.imaps[i] === imap) {
                        $scope.imaps.splice(i, 1);
                    }
                }
            } else {
                $scope.imap.$remove(function() {
                    $location.path('imaps');
                });
            }
        };

        // Update existing Imap
        $scope.update = function() {
            var imap = $scope.imap;

            imap.$update(function() {
                $location.path('imaps/' + imap._id);
            });
        };

        // Find a list of Imaps
        $scope.find = function() {
            // Google Map stuff
            $scope.map = {
                center: {
                    latitude: 43.77394,
                    longitude: -79.40845
                },
                options: {
                    mapTypeControl: false,
                    streetViewControl: false,
                    panControl: false,
                    scrollwheel: false,
                    disableDoubleClickZoom: true,
                    draggable: false,
                    maxZoom: 20,
                    minZoom: 3
                },
                zoom: 13,
                dragging: 'false',
                myMarker: {
                    coords: {
                        latitude: 43.77394,
                        longitude: -79.40845
                    },
                    options: { 
                        icon: '/img/blue_marker.png',
                        showWindow: false,
                        title: 'McKee'
                    }
                },
                markers: [
                    {
                        latitude: 43.773200,
                        longitude: -79.429943,
                        showWindow: false,
                    },
                    {
                        latitude: 43.769000,
                        longitude: -79.397049,
                        showWindow: false,
                        title: 'Loc2'
                    },
                    {
                        latitude: 43.782414,
                        longitude:  -79.389590,
                        showWindow: true,
                        title: 'Loc3'
                    }
                ]
            };

            var onMarkerClicked = function (marker) {
                marker.showWindow = true;
                $scope.$apply();
                // window.alert("Marker: lat: " + marker.latitude + ", lon: " + marker.longitude + " clicked!!")
            };


            _.each($scope.map.markers, function (marker) {
                marker.closeClick = function () {
                    marker.showWindow = false;
                    $scope.$apply();
                };
                marker.onClicked = function () {
                    onMarkerClicked(marker);
                };
            });

            Imaps.query(function(imaps) {
                $scope.imaps = imaps;
                _.each(imaps, function(loc) {
                    var thisMarker = {
                        latitude: loc.latitude,
                        longitude:  loc.longitude,
                        showWindow: false,
                        title: loc.name
                    };

                    thisMarker.closeClick = function () {
                        thisMarker.showWindow = false;
                        $scope.$apply();
                    };

                    thisMarker.onClicked = function () {
                        onMarkerClicked(thisMarker);
                    };

                    $scope.map.markers.push(thisMarker);
                });               
            });
            
        };

        // Find existing Imap
        $scope.findOne = function() {
            Imaps.get({
                imapId: $stateParams.imapId
            }, function(imap) {
                $scope.imap = imap;
            });
        };

    }
]);