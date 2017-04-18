var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.register = function(req, res) {
	if (!req.body.name || !req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}
	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.organization = req.body.organization;
	user.homePage = req.body.homePage;
	user.tags = req.body.tags;
	user.setPassword(req.body.password);
	user.joined = Date.now();
	user.save(function(err) {
		var token;
		if (err) {
			sendJSONresponse(res, 404, {
				"message": err//"Email already in use"
			});
		} else {
			token = user.generateJwt();
			sendJSONresponse(res, 200, {
				"token": token
			});
		}
	});
};

module.exports.login = function(req, res) {
	if (!req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}
	passport.authenticate('local', function(err, user, info) {
		var token;
		if (err) {
			sendJSONresponse(res, 404, err);
			return;
		}
		if (user) {
			token = user.generateJwt();
			sendJSONresponse(res, 200, {
				"token": token
			});
		} else {
			sendJSONresponse(res, 401, info);
		}
	}) (req, res);
};