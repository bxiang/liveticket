'use strict';

//Tickets service used to communicate Tickets REST endpoints
angular.module('tickets').
	factory('Tickets', ['$resource', function($resource) {
	    return $resource('tickets/:ticketId', {
	        ticketId: '@_id'
	    }, {
	        update: {
	            method: 'PUT'
	        }
	    });
	}]).
    factory('Lookup', function() {
      var Lookup = {
        'statues': ['Open', 'In progress', 'Completed', 'Tested', 'Reopen', 'Not fix', 'Canceled', 'Closed'],
        'types': ['Defect', 'Change Request'],
        'roles': ['Developer', 'QA', 'User'],
        'severities': ['Minor', 'Normal', 'Critical'],
        'priorities': ['Low', 'Normal', 'High', 'Urgent']};

      // $http.get('/api/user').
      //   success(function(data, status, headers, config) {
      //     Lookup.assignees = data;
      //   });

      return Lookup;
    });	