var mongoose = require('mongoose');
var fs = require('fs');
var Room = mongoose.model('Room');


var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.getUserRooms = function(req, res) {
	if (!req.params.userid) {
		sendJSONresponse(res, 400, {
			"message": "No permit."
		});
		return;
	}

	Room
		.find({
			admin: req.params.userid
		})
		.exec(function(err, room) {
			if (!room) {
				sendJSONresponse(res, 404, {
					"message": "You have no rooms"
				});
				return;
			} else if (err) {
				sendJSONresponse(res, 404, {
					"message": err
				});
				return;
			}
			sendJSONresponse(res, 200, room);
		});
};

module.exports.getPublicRooms = function(req, res) {
	Room
		.find({
			public: true
		})
		.exec(function(err, room) {
			if (!room) {
				sendJSONresponse(res, 404, {
					"message": "No public rooms."
				});
				return;
			} else if (err) {
				sendJSONresponse(res, 404, err);
				return;
			}
			sendJSONresponse(res, 200, room);
		});
};

module.exports.getRoom = function(req, res) {
	if (!req.params.roomid) {
		sendJSONresponse(res, 400, {
			"message": "No id"
		});
		return;
	}

	Room
		.findOne({
			_id: req.params.roomid
		})
		.exec(function(err, room) {
			if (!room) {
				sendJSONresponse(res, 404, {
					"message": "Room not found"
				});
				return;
			} else if (err) {
				sendJSONresponse(res, 404, err);
				return;
			}
			sendJSONresponse(res, 200, room);
		});
};

module.exports.createRoom = function(req, res) {
	if (!req.body.name || !req.body.description || !req.body.tags) {
		sendJSONresponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}

	var room = new Room();

	room.roomName = req.body.name;
	room.description = req.body.description;
	room.admin = req.body.admin;
	room.tags = req.body.tags;
	if (req.body.thumbnail) room.thumbnail = req.body.thumbnail;
	
	// with fs
	//var img = fs.readFileSync("./public/uploads/" + fileName);
	//var encImg = new Buffer(img).toString('base64');
	//console.log("encImg as string is: " + encImg);
	/*
	var thumbnail = {name: "thumb.jpg",
					img: encImg,
					contentType: "image/jpg"
				};
	*/

	//room.thumbnail = encImg;

	if (req.body.userLimit) {
		room.userLimit = req.body.userLimit;
	}

	if (req.body.public) {
		room.public = req.body.public;
	} else {
		room.public = false;
	}

	room.save(function(err) {
		if (err) {
			if (err.code == 11000) {
				sendJSONresponse(res, 400, { "message": 'Room name already in use'});
			} else {
				sendJSONresponse(res, 400, {
					"message": err //"Room name already in use, please select another name."
				});
			}
		} else {
			sendJSONresponse(res, 200, {
				"message": ("Created room " + req.body.name)
			});
		}
	});
};

module.exports.updateVideo = function(req, res) {
	if (!req.body.id || !req.params.roomid) {
		sendJSONresponse(res, 406, {
			message: 'Invalid request'
		});
		return;
	}

	Room.findOne({
		_id: req.params.roomid
	}, function(err, room) {
		if (err) {
			sendJSONresponse(res, 500, err);
		} else {
			room.currentVideo.id = req.body.id;
			room.currentVideo.title = req.body.title;
			room.save(function(err) {
				if (!err) {
					sendJSONresponse(res, 200, room);
				} else if (err.code == 11000) {
					sendJSONresponse(res, 406, {
						message: 'Invalid email'
					});
				} else {
					sendJSONresponse(res, 406, {
						message: err
					});
				}
			});
		}
	});
};

module.exports.togglePlaylist = function(req, res) {
	if (!req.params.roomid) {
		sendJSONresponse(res, 406, {
			message: 'Invalid request'
		});
		return;
	}

	Room.findOne({
		_id: req.params.roomid
	}, function(err, room) {
		if (err) {
			sendJSONresponse(res, 500, err);
		} else {
			if (room.playlist){
				room.playlist = false;
			} else {
				room.playlist = true;
			}
			room.save(function(err) {
				if (!err) {
					sendJSONresponse(res, 200, room);
				} else if (err.code == 11000) {
					sendJSONresponse(res, 406, {
						message: 'Invalid email'
					});
				} else {
					sendJSONresponse(res, 406, {
						message: err
					});
				}
			});
		}
	});
};


module.exports.editRoom = function(req, res) {
	if (!req.body.roomName || !req.body.description || !req.body.tags) {
		sendJSONresponse(res, 400, {
			message: 'All fieds are required'
		});
		return;
	}

	Room
		.findOne({
			_id: req.params.roomId
		})
		.exec(function(err, room) {
			if (err) {
				sendJSONresponse(res, 500, {
					message: err
				});
			} else if (!room) {
				sendJSONresponse(res, 404, {
					message: 'No room found'
				});
			} else {
				room.roomName = req.body.roomName;
				room.description = req.body.description;
				room.tags = req.body.tags;
				room.playlistId = req.body.playlistId;
				room.save(function(err) {
					if (!err) {
						sendJSONresponse(res, 200, room);
					} else if (err.code == 11000) {
						sendJSONresponse(res, 400, {
							message: 'Room name already in use'
						});
					} else {
						sendJSONresponse(res, 500, {
							message: err
						});
					}
				});
			}
		});
};