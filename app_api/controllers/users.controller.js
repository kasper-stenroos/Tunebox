var mongoose = require('mongoose');
var Users = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.getAllUsers = function(req, res) {
	Users.find({}, function(err, users) {
		if(err) {
			sendJSONresponse(res, 500, err);
		} else {
			sendJSONresponse(res, 200, users);
		}
	});
}

module.exports.getUser = function(req, res) {
	Users.findOne({ _id: req.params.id }, function(err, user) {
		if (err) {
			sendJSONresponse(res, 500, err)
		} else if (user != null) {
			sendJSONresponse(res, 200, user);
		} else {
			sendJSONresponse(res, 404, 'No matches!');
		}		
	});
}

module.exports.editUser = function(req, res) {
	if (!req.body.name || !req.body.email) {
		sendJSONresponse(res, 400, {
			message: 'Name and email are required'
		});
		return;
	}

	Users.findOne({ _id: req.params.id }, function(err, user) {
		if (err) {
			sendJSONresponse(res, 500, err);
		} else if (user) {
			user.name = req.body.name;
			user.email = req.body.email;

			if (req.body.homePage) {
				user.homePage = req.body.homePage;
			} else {
				user.homePage = '';
			}

			if (req.body.organization) {
				user.organization = req.body.organization
			} else {
				user.organization = '';
			}
			
			if (req.body.tags) {
				user.tags = req.body.tags;
			} else {
				user.tags = [];
			}
			
			user.save(function(err) {
				if(!err) {
					var token = user.generateJwt();
					sendJSONresponse(res, 200, {
						user: user,
						token: token
					});
				} else if (err.code == 11000) {
					sendJSONresponse(res, 400, { message: 'Invalid email' });
				} else {
					sendJSONresponse(res, 500, { message: err });
				}
			});
		} else {
			sendJSONresponse(res, status, { message: 'No room found.' });
		}
	});
}

module.exports.changeUserColor = function(req, res) {
	Users.findOne({ _id: req.params.id }, function(err, user) {
		if (err) {
			sendJSONresponse(res, 500, err);
		} else if (user) {
			user.color = req.body.color;
			user.save(function(err) {
				if(!err) {
					var token = user.generateJwt();
					sendJSONresponse(res, 200, {
						user: user,
						token: token
					});
				} else if (err.code == 11000) {
					sendJSONresponse(res, 400, { message: 'Invalid email' });
				} else {
					sendJSONresponse(res, 500, { message: err });
				}
			});
		} else {
			sendJSONresponse(res, status, { message: 'No room found.' });
		}
	});
}