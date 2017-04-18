(function() {
	angular
		.module('TuneBox')
		.controller("roomcreationCtrl", roomcreationCtrl);

	roomcreationCtrl.$inject = ['$scope', 'authentication', '$location', 'roomService'];

	function roomcreationCtrl($scope, authentication, $location, roomService) {
		if (!authentication.isLoggedIn()) {
			$location.path('/');
		}
		$scope.error = '';

		// scope functions
		$scope.createRoom = function() {
			if ($scope.room && $scope.room.tags) {
				$scope.room.admin = authentication.getUserInfo()._id;
				var tags = roomService.filterDublicateTags($scope.room.tags);
				$scope.room.tags = tags;
			}
			roomService.createRoom($scope.room).success(function(res) {
				$location.path('/browse');
			}).error(function(res) {
				if (res.message) {
					$scope.error = res.message;
				} else {
					$scope.error = 'Picture was too large';
				}
			});
		}

		$scope.hideMessages = function() {
			$scope.error = '';
		}
	}
})();