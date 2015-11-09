angular.module('MainCtrl', []).controller('MainCtrl', function($scope, $http, $location, Browse, Util, Firebase) {
	var baseUrl = 'https://api.spotify.com';
	$scope.artists = [];
	$scope.currArtist = Browse.currArtist;

	$scope.currentSong = null;
	$scope.audioObject = {};

	$scope.songs = Firebase.songs;

	$scope.getArtists = function() {
		var search = Util.toUrl($scope.searchString);
		var url = baseUrl + "/v1/search?q=" + search + "&type=artist";
		console.log(url);
		$http.get(url).success(function(res) {
			$scope.artists = res.artists.items;
			console.log($scope.artists);
		});
	}

	$scope.addPlaylist = Firebase.addPlaylist;

	$scope.selectArtist = function(artist) {
		Browse.currArtist = artist;
		$location.path("/#artist/" + artist.id);
	}

	$scope.login = function() {
		Firebase.login();
	}

	$scope.playSong = function(song) {
		var songUrl = song.preview_url;
		if($scope.currentSong == song) {
			$scope.audioObject.pause()
			$scope.currentSong = false
		} else {
			if($scope.audioObject.pause != undefined) $scope.audioObject.pause();
			Firebase.addSong(song, new Date().toJSON());
			$scope.audioObject = new Audio(songUrl);
			$scope.audioObject.play();
			$scope.currentSong = song;
		}
	}

	$scope.$on("$destroy", function() {
        if($scope.audioObject.pause != undefined) $scope.audioObject.pause();
    });
});