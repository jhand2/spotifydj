angular.module('MainCtrl', []).controller('MainCtrl', function($scope, $http, $location, Browse) {
	var baseUrl = 'https://api.spotify.com';
	$scope.audioObj = {};
	$scope.artists = [];
	$scope.currArtist = Browse.currArtist;
	$scope.currAlbum = {};
	$scope.currSong = {};

	$scope.play = function(song) {
		if($scope.currentSong == song) {
			$scope.audioObject.pause()
			$scope.currentSong = false
		} else {
			if($scope.audioObject.pause != undefined) $scope.audioObject.pause();
			$scope.audioObject = new Audio(song);
			$scope.audioObject.play();
			$scope.currentSong = song;
		}
	}

	$scope.getArtists = function() {
		var search = toUrl($scope.searchString);
		var url = baseUrl + "/v1/search?q=" + search + "&type=artist";
		console.log(url);
		$http.get(url).success(function(res) {
			$scope.artists = res.artists.items;
			console.log($scope.artists);
		});
	}

	$scope.search = function() {

	}

	// Takes a search string and replaces any whitespace to be used in REST API
	// searches
	var toUrl = function(searchString) {
		var searchArr = searchString.trim().split(/\s+/);
		var urlString = "";
		for (var i = 0; i < searchArr.length; i++) {
			var next = searchArr[i];
			if (i > 0) {
		 		next = '%20' + next;
			}
			urlString += next;
		}
		return urlString;
	}

	$scope.selectArtist = function(artist) {
		Browse.currArtist = artist;
		$location.path("/#search/artist/" + artist.id);
	}

	$scope.load = function() {
		console.log($location.$$path);
		console.log("Test");
	}
});