var passport = require('passport');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = mongoose.model('User');
var Room = mongoose.model('Room');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

var getUserTags = function(req, res, callback) {
	//Get info from auth service here?
	if (req.payload && req.payload.email) {
		User.findOne({ email: req.payload.email }).exec(function(err, user) {
			if (!user) {
				sendJSONresponse(res, 404, { "message": "User not found" });
				return;
			} else if (err) {
				console.log(err);
				sendJSONresponse(res, 404, err);
				return;
			}
			callback(req, res, user.tags);
		});
	} else {
		sendJSONresponse(res, 404. { "message": "User not found" });
		return;
	}
};

var getRoomsWithTags = function(userTags) {
	if (userTags) {
		Room.find({tags: { $in: userTags }}).exec(function(err, rooms) {
			if (!rooms) {
				sendJSONresponse(res, 404, { "message": "No rooms found"});
				return;
			} else if (err) {
				console.log(err);
				sendJSONresponse(res, 404, err);
				return;
			}
			return rooms;
		});
	} else {
		sendJSONresponse(res, 404, { "message": "User's tags required" });
		return;
	}
};

module.exports.recom = function(req, res) {
	getUserTags(req, res, function(req, res, userTags) {
		//Do stuff with returned rooms
		return getRoomsWithTags(userTags);
	});
};
