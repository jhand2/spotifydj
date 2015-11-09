angular.module('ArtistCtrl', []).controller('ArtistCtrl', function($scope, $http, $location, Browse) {
	var baseUrl = 'https://api.spotify.com';

	$scope.currArtist = Browse.currArtist;
	$scope.albums = [];

	$scope.loadArtist = function() {
		var path = $location.$$path;
		var pathArr = path.trim().split(/\//);
		var id = pathArr[pathArr.length - 1];
		$http.get(baseUrl + '/v1/artists/' + id).success(function(res) {
			$scope.currArtist = res;
			Browse.currArtist = res;
			getAlbums(id);
		});
	}

	$scope.selectAlbum = function(album) {
		$location.path("/#album/" + album.id);
	}

	var getAlbums = function(artistId) {
		$http.get(baseUrl + '/v1/artists/' + artistId + '/albums').success(function(res) {
			console.log(res);
			$scope.albums = res.items;
		})
	}
});