(function() {
	angular
	.module('TuneBox')
	.service('checkLogin', checkLogin);

	checkLogin.$inject = [];

	function checkLogin() {
		
		this.loginData = {
			showLogin: false
		}

		this.getAll = function() {
			return this.loginData;
		}

		this.setShowLogin = function(val){
			this.loginData.showLogin = val;
		}

		this.showLogoutUI = function(){
			this.setShowLogin(false);
		}

		this.showLoginUI = function(){
			this.setShowLogin(true);
		}

	}

})();