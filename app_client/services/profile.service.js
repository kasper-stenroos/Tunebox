(function() {
	angular
		.module('TuneBox')
		.service('profileService', profileService);

	profileService.$inject = ['$http'];

	function profileService($http) {
		var saveProfile = function(user) {
			var url = '/api/users/' + user._id;
			return $http.put(url, user);
		};

		var getProfile = function(_id){
			return $http.get('/api/users/'+_id).success(function(data){

			});
		}

		var saveUserColor = function(user){
			var url = '/api/users/color/' + user._id;
			return $http.put(url, user);
		}

		return {
			saveProfile: saveProfile,
			getProfile: getProfile,
			saveUserColor: saveUserColor
		};	
	}
})();