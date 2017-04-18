(function() {
	angular
		.module('TuneBox')
		.controller("roomlistingCtrl", roomlistingCtrl);

	roomlistingCtrl.$inject = ['$scope', 'authentication', '$location', 'roomService', '$window'];

	function roomlistingCtrl($scope, authentication, $location, roomService, $window) {
		$scope.publicRoom = true;
		$scope.yourRoom = false;
		$scope.publicActive = "room-type-selection-active";
		$scope.yourActive = "";

		if (!authentication.isLoggedIn()) {
			$location.path('/');
		}
		var userID = authentication.getUserInfo()._id;
		roomService.getUserRooms(userID).success(function(data) {
			console.log(data);
			$scope.adminRooms = data;
		});

		$scope.goToRoom = function(_id) {
			console.log('Tääl');
			$location.path("/room/" + _id);
			/*setTimeout(function() {
				$window.location.reload();
			}, 1000);*/
		}

		$scope.showPublicRooms = function() {
			$scope.publicRoom = true;
			$scope.yourRoom = false;
			$scope.publicActive = "room-type-selection-active";
			$scope.yourActive = "";
		}

		$scope.showYourRooms = function() {
			$scope.publicRoom = false;
			$scope.yourRoom = true;
			$scope.publicActive = "";
			$scope.yourActive = "room-type-selection-active";
		}

		roomService.getPublicRooms().success(function(data) {
			$scope.publicRooms = data;
		});
		//console.log(userRooms);
	}
})();