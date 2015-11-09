angular.module('AlbumCtrl', []).controller('AlbumCtrl', function($scope, $http, $location, Browse, Firebase) {
	var baseUrl = 'https://api.spotify.com';

	$scope.currAlbum = null;
	$scope.tracks = null;
	$scope.currentSong = null;
	$scope.audioObject = {};

	$scope.loadAlbum = function() {
		// If we don't have the current artist, grab it
		// from the spotify API
		if ($scope.currAlbum == null) {
			var path = $location.$$path;
			var pathArr = path.trim().split(/\//);
			var id = pathArr[pathArr.length - 1];
			$http.get(baseUrl + '/v1/albums/' + id).success(function(res) {
				$scope.currAlbum = res;
				Browse.currAlbum = res;
				getSongs(id);
			});
		}
	}

	$scope.playSong = function(song) {
		var songUrl = song.preview_url;
		Firebase.addSong(song, new Date().toJSON());
		if($scope.currentSong == song) {
			$scope.audioObject.pause()
			$scope.currentSong = false
		} else {
			if($scope.audioObject.pause != undefined) $scope.audioObject.pause();
			$scope.audioObject = new Audio(songUrl);
			$scope.audioObject.play();
			$scope.currentSong = song;
		}
	}

	var getSongs = function(albumId) {
		$http.get(baseUrl + '/v1/albums/' + albumId + '/tracks').success(function(res) {
			$scope.tracks = res.items;
		})
	}

	$scope.$on("$destroy", function() {
        if($scope.audioObject.pause != undefined) $scope.audioObject.pause();
    });
});