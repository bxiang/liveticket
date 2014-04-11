'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;

		$scope.menu = [{
			title: 'Tickets',
			link: 'tickets',
			uiRoute: '/tickets'
		}, {
			title: 'New Ticket',
			link: 'tickets/create',
			uiRoute: '/tickets/create'
		}, {
			title: 'Articles',
			link: 'articles',
			uiRoute: '/articles'
		}];

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
	}
]);