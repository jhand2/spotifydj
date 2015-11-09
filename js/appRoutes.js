angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', 
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/search', {
			templateUrl: 'views/search.html',
			controller: 'MainCtrl'
		})
		.when('/newplaylist', {
			templateUrl:'views/namePlaylist.html',
			controller:'MainCtrl'
		})
		.when('/#artist/:id', {
			templateUrl:'views/artist.html',
			contoller: 'MainCtrl'
		})
		.when('/#album/:id', {
			templateUrl:'views/album.html',
			controller:'AlbumCtrl'
		})
		.when('/', {
			templateUrl:'views/topSongs.html',
			controller:'MainCtrl'
		});

		$locationProvider.html5Mode(false);
	}
]);