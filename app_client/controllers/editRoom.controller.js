(function() {
	angular
		.module('TuneBox')
		.controller('editRoomCtrl', editRoomCtrl);

	editRoomCtrl.$inject = ['authentication', '$location', '$routeParams', 'roomService', '$scope', '$timeout'];

	function editRoomCtrl(authentication, $location, $routeParams, roomService, $scope, $timeout) {
		if (!authentication.isLoggedIn()) $location.path('/');

		roomService.getRoom($routeParams.roomId).success(function(room) {
			if (room.admin !== authentication.getUserObject()._id) $location.path('/');
			$scope.room = room;
			$scope.original = angular.copy(room);
			$scope.edited = false;
			$scope.$watch('room', function() {
				if (!angular.equals($scope.room, $scope.original)) {
					$scope.edited = true;
				} else {
					$scope.edited = false;	
				}
			}, true);
		}).error(function(err) {
			console.log(err);
		});

		// scope functions
		$scope.save = function() {
			var tags = roomService.filterDublicateTags($scope.room.tags);
			$scope.room.tags = tags;
			roomService.editRoom($scope.room).success(function(room) {
				$scope.room = room;
				$scope.original = angular.copy(room);
				$scope.edited = false;
				$scope.showError = false;
				$scope.showSuccess = true;
				$timeout(function() { $scope.showSuccess= false; }, 4000);
			}).error(function(err) {
				$scope.error = err.message;
				$scope.showError = true;
			});
		}

		$scope.cancel = function() {
			$location.path('/browse');
		}

		$scope.hideMessages = function() {
			$scope.showError = false;
			$scope.showSuccess = false;
		}
	}
})();