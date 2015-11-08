angular.module('FirebaseService', []).service('Firebase', ['$firebaseObject', '$firebaseArray', function($firebaseObject, $firebaseArray) {
	var data = {};

	var ref = new Firebase("https://spotify-dj.firebaseio.com");
	var playlistRef = ref.child('playlists');

	data.playlists = $firebaseArray(playlistRef);

	data.addPlaylist = function(name) {
		var playlist = {
			name: name
		}
		data.playlists.$add(playlist);
		return playlist;
	}

	return data;
}]);