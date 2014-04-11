'use strict';

// Tickets controller
angular.module('tickets').controller('TicketsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Lookup', 'Tickets',
    function($scope, $stateParams, $location, Authentication, Lookup, Tickets) {
        $scope.authentication = Authentication;
        $scope.lookup = Lookup;

        // Create new Ticket
        $scope.create = function() {
        	// Create new Ticket object
            var ticket = new Tickets({
                description: this.description,
                detail: this.detail,
                // assignee: this.assignee,
                priority: this.priority,
                severity: this.severity
            });

            // Redirect after save
            ticket.$save(function(response) {
                $location.path('tickets/' + response._id);
            });

            // Clear form fields
            this.description = '';
            this.detail = '';
            // this.assignee = '';
            this.priority = '';
            this.severity = '';
        };

        // Remove existing Ticket
        $scope.remove = function(ticket) {
            if (ticket) {
                ticket.$remove();

                for (var i in $scope.tickets) {
                    if ($scope.tickets[i] === ticket) {
                        $scope.tickets.splice(i, 1);
                    }
                }
            } else {
                $scope.ticket.$remove(function() {
                    $location.path('tickets');
                });
            }
        };

        // Update existing Ticket
        $scope.update = function() {
            var ticket = $scope.ticket;

            ticket.$update(function() {
                $location.path('tickets/' + ticket._id);
            });
        };

        // Find a list of Tickets
        $scope.find = function() {
            Tickets.query(function(tickets) {
                $scope.tickets = tickets;
            });
        };

        // Find existing Ticket
        $scope.findOne = function() {
            Tickets.get({
                ticketId: $stateParams.ticketId
            }, function(ticket) {
                $scope.ticket = ticket;
            });
        };
    }
]);