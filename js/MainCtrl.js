angular.module('MainCtrl', []).controller('MainCtrl', function($scope, $http, $location, Browse, Util) {
	var baseUrl = 'https://api.spotify.com';
	$scope.audioObj = {};
	$scope.artists = [];
	$scope.albums = [];
	$scope.currArtist = Browse.currArtist;
	$scope.currAlbum = {};
	$scope.currSong = {};

	$scope.getArtists = function() {
		var search = Util.toUrl($scope.searchString);
		var url = baseUrl + "/v1/search?q=" + search + "&type=artist";
		console.log(url);
		$http.get(url).success(function(res) {
			$scope.artists = res.artists.items;
			console.log($scope.artists);
		});
	}

	$scope.selectArtist = function(artist) {
		Browse.currArtist = artist;
		$location.path("/#artist/" + artist.id);
	}

	$scope.login = function() {
		ref.authAnonymously(function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				console.log("Authenticated successfully: ", authData);
			}
		});
	}
});