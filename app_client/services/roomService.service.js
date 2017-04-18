(function() {
	angular
		.module('TuneBox')
		.service('roomService', roomService);

	roomService.$inject = ['$window', '$http'];

	function roomService($window, $http) {
		
		var createRoom = function(room){
			return $http.post('api/createRoom', room).success(function(data){
				console.log(data);
			});
		};

		var getUserRooms = function(userID){
			console.log(userID);
			return $http.get('api/rooms/'+userID).success(function(data){
				//console.log(data);		
			});
		}

		var getPublicRooms = function(){
			return $http.get('api/rooms').success(function(data){
			});
		}

		var getRoom = function(_id){
			return $http.get('api/room/'+_id).success(function(data){
			});
		}

		var editRoom = function(room) {
			var url = '/api/room/' + room._id;
			return $http.put(url, room);
		}

		var filterDublicateTags = function(tags) {
			var cleanedTags = [];
			tags.forEach(function(string) {
				var found = false;
				if (cleanedTags.length == 0) cleanedTags.push(string);

				cleanedTags.forEach(function(str) {
					if (string === str) {
						found = true;
					}
				});
				if (!found) {
					cleanedTags.push(string);
				}
			});
			return cleanedTags;
		}

		var saveMessage = function(message){
			return $http.post('api/saveMessage', message).success(function(data){
				//console.log(data);
			});
		}

		var getMessages = function(_id){
			return $http.get('api/getMessages/'+_id).success(function(data){
				console.log(data);
			});
		}

		var changeVideo = function(_id, video){
			console.log("SERVICE");
			console.log(video);
			return $http.put('api/updateVideo/'+_id, video).success(function(data){

			});
		}

		var togglePlaylist = function(_id){
			return $http.put('/api/togglePlaylist/'+_id).success(function(data){

			});
		}

		return {
			createRoom : createRoom,
			getUserRooms: getUserRooms,
			getPublicRooms: getPublicRooms,
			getRoom: getRoom,
			saveMessage: saveMessage,
			getMessages: getMessages,
			changeVideo: changeVideo,
			editRoom: editRoom,
			filterDublicateTags: filterDublicateTags,
			togglePlaylist: togglePlaylist
		};
	}
})();