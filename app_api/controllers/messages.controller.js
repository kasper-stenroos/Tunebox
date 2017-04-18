var mongoose = require('mongoose');
var Message = mongoose.model('Message');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.saveMessage = function(req, res) {
	if (!req.body.sender || !req.body.message || !req.body.room) {
		sendJSONresponse(res, 400, {
			"message": "Invalid message"
		});
		return;
	}

	var msg = new Message();

	msg.sender = req.body.sender;
	msg.message = req.body.message;
	msg.time = Date.now();
	msg.room = req.body.room;

	msg.save(function(err) {
		if (err) {
			sendJSONresponse(res, 400, {
				"message": err
			});
		} else {
			sendJSONresponse(res, 200, {
				"message": ("Sent message: " + req.body.message)
			});
		}
	});


};

module.exports.getMessages = function(req, res) {
	if (!req.params.roomid) {
		sendJSONresponse(res, 400, {
			"message": "Invalid request"
		});
		return;
	}

	Message
	.find({
		room: req.params.roomid
	})
	.sort({
		time: 1
	})
	.exec(function(err, message){
		if (!message) {
				sendJSONresponse(res, 404, {
					"message": "No messages in the room."
				});
				return;
			} else if (err) {
				sendJSONresponse(res, 404, {
					"message": err
				});
				return;
			}
			sendJSONresponse(res, 200, message);
	});

};