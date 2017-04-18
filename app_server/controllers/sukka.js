var express = require('express');
var router = express.Router();
var http = require('http');
var app = express();
var server = http.Server(app);

module.exports = function(io) {
	io.on('connection', function(socket) {
		console.log('a user connected');
		
		socket.on('msg', function(message){
			console.log('message:'+message);
			io.emit('msg', message);
		});

		socket.on('changeVideo', function(message){
			io.emit('changeVideo', message);
		});
	});

};