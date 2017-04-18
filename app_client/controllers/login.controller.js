(function() {
	angular
		.module('TuneBox')
		.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = ['$scope', 'authentication', '$location', 'checkLogin'];

	function loginCtrl($scope, authentication, $location, checkLogin) {
		if (authentication.isLoggedIn()) {
			$location.path('/');
		}

		$scope.error = '';

		// scope functions
		$scope.login = function() {
			authentication.login($scope.user).success(function(res) {
				checkLogin.showLoginUI();
				$location.path('/');
			}).error(function(res) {
				$scope.error = res.message;
			});
		}

		$scope.hideError = function() {
			$scope.error = '';
		}

		$scope.onEnterKeyPress = function(event) {
			var keyCode = event.which || event.keyCode;
			if (keyCode == 13) $scope.login();
		}
	}
})();