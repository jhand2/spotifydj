angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', 
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/search', {
			templateUrl: 'views/dj.html',
			controller: 'MainCtrl'
		})
		.when('/#search/artist/:id', {
			templateUrl:'views/artist.html',
			contoller: 'MainCtrl'
		});

		$locationProvider.html5Mode(false);
	}
]);