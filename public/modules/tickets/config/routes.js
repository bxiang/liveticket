'use strict';

//Setting up route
angular.module('tickets').config(['$stateProvider',
	function($stateProvider) {
		// Tickets state routing
		$stateProvider.
		state('listTickets', {
			url: '/tickets',
			templateUrl: 'modules/tickets/views/list.html'
		}).
		state('createTicket', {
			url: '/tickets/create',
			templateUrl: 'modules/tickets/views/create.html'
		}).
		state('viewTicket', {
			url: '/tickets/:ticketId',
			templateUrl: 'modules/tickets/views/view.html'
		}).
		state('editTicket', {
			url: '/tickets/:ticketId/edit',
			templateUrl: 'modules/tickets/views/edit.html'
		});
	}
]);