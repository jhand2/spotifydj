angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', 
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/search', {
			templateUrl: 'views/search.html',
			controller: 'MainCtrl'
		})
		.when('/#artist/:id', {
			templateUrl:'views/artist.html',
			contoller: 'MainCtrl'
		})
		.when('/#album/:id', {
			templateUrl:'views/album.html',
			controller:'AlbumCtrl'
		});

		$locationProvider.html5Mode(false);
	}
]);