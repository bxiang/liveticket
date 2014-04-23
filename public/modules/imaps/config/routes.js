'use strict';

//Setting up route
angular.module('imaps').config(['$stateProvider',
	function($stateProvider) {
		// Imaps state routing
		$stateProvider.
		state('listImaps', {
			url: '/imaps',
			templateUrl: 'modules/imaps/views/list.html'
		}).
		state('createImap', {
			url: '/imaps/create',
			templateUrl: 'modules/imaps/views/create.html'
		}).
		state('viewImap', {
			url: '/imaps/:imapId',
			templateUrl: 'modules/imaps/views/view.html'
		}).
		state('editImap', {
			url: '/imaps/:imapId/edit',
			templateUrl: 'modules/imaps/views/edit.html'
		});
	}
]);