angular.module('UtilService', []).service('Util', [function() {
	return {
		// Takes a search string and replaces any whitespace to be used in REST API
		// searches
		toUrl: function(searchString) {
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
		},
		authData: null,
	}
}]);