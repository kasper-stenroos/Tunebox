(function() {
	angular
		.module('TuneBox')
		.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['$scope', 'authentication'];

	function homeCtrl($scope, authentication) {
		/*if (authentication.isLoggedIn()) {
			checkLogin.showLoginUI();
		} else {
			checkLogin.showLogoutUI();
		}*/

	}
})();