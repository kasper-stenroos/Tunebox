(function() {
	angular
		.module('TuneBox')
		.controller('registerCtrl', registerCtrl);

	registerCtrl.$inject = ['$scope', 'authentication', '$location', 'checkLogin'];

	function registerCtrl($scope, authentication, $location, checkLogin) {
		if (authentication.isLoggedIn()) {
			$location.path('/');
		}
		$scope.error = '';

		// scope functions
		$scope.register = function() {
			authentication.register($scope.user).success(function(res) {
				checkLogin.showLoginUI();
				$location.path('/');
			}).error(function(res) {
				$scope.error = res.message;
			});
		}

		$scope.hideMessages = function() {
			$scope.error = '';
		}
	}
})();