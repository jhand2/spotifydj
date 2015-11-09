angular.module('FirebaseService', []).service('Firebase', ['$firebaseObject', '$firebaseArray', 'Util', function($firebaseObject, $firebaseArray, Util) {
	var data = {};

	var ref = new Firebase("https://spotify-dj.firebaseio.com");
	var playlistRef = ref.child('playlists');
	var songsRef = ref.child('songs');

	data.playlists = $firebaseArray(playlistRef);
	data.songs = $firebaseArray(songsRef);

	var indexOfSong = function(song) {
		var songs = data.songs;
		var index = -1;
		for (var i = 0; i < songs.length; i++) {
			if (songs[i].songData.uri === song.uri) {
				index = i;
			}
		};
		return index;
	}

	data.addPlaylist = function(name) {
		var playlist = {
			name: name
		}
		data.playlists.$add(playlist);
		return playlist;
	}

	data.login = function() {
		ref.authAnonymously(function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				console.log("Authenticated successfully: ", authData);
				Util.authData = authData;
			}
		});
	}

	data.addSong = function(song, date) {
		var songInfo = {
			songData: song,
			dateStarted: date
		}
		var index = indexOfSong(song);

		if (index >= 0) {
			data.songs.$remove(index);
		}
		data.songs.$add(songInfo);
	}

	return data;
}]);