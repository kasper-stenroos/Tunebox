(function() {
	angular
		.module('TuneBox')
		.controller('profileCtrl', profileCtrl);

	profileCtrl.$inject = ['$scope', 'authentication', '$location', 'profileService', '$timeout', '$window', 'roomService'];

	function profileCtrl($scope, authentication, $location, profileService, $timeout, $window, roomService) {
		if (!authentication.isLoggedIn()) $location.path('/');

		$scope.user = authentication.getUserObject();
		$scope.original = angular.copy(authentication.getUserObject());

		$scope.$watch('user', function(){
			if (!angular.equals($scope.original, $scope.user)) {
				$scope.edited = true;
			} else {
				$scope.edited = false;
			}
		}, true);

		// scope functions
		$scope.editProfile = function() {
			$scope.editInfo = true;
		}

		$scope.save = function(form) {
			var tags = roomService.filterDublicateTags($scope.user.tags);
			$scope.user.tags = tags;
			profileService.saveProfile($scope.user).success(function(data) {
				authentication.saveToken(data.token);
				$scope.showSuccess = true;
				hideAndResetForm();
				$timeout(function() { $scope.showSuccess= false; }, 3000);
			}).error(function(err) {
				$scope.showSuccess = false;
				$scope.showError = true;
				$scope.error = err.message;
			});
		}

		$scope.cancel = function() {
			hideAndResetForm();
		}

		$scope.hideMessages = function() {
			$scope.showError = false;
			$scope.showSuccess = false;
		}

		$scope.getPremium = function() {
			$window.alert('This is a placeholder (The feature will be implemented later)');
		}

		// other functions
		var hideAndResetForm = function() {
			$scope.showError = false;
			$scope.edited = false;
			$scope.editInfo = false;
			$scope.user = authentication.getUserObject();
			$scope.original = angular.copy(authentication.getUserObject());
		}
	}
})();