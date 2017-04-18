(function() {
	angular
	.module('TuneBox')
	.controller('navigationCtrl', navigationCtrl);

	navigationCtrl.$inject = ['$scope', 'authentication', 'checkLogin', '$location'];

	function navigationCtrl($scope, authentication, checkLogin, $location) {

		if(!authentication.isLoggedIn()){
			$scope.loginData = checkLogin.getAll();
		} else {
			$scope.loginData = checkLogin.getAll();
			checkLogin.showLoginUI();
		}

		$scope.logout_function = function(){
			console.log("logout function");
			authentication.logout();
			checkLogin.showLogoutUI();
			$location.path('/');
		}

		$scope.user = authentication.getUserInfo();
	}
})();