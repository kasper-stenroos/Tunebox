var express = require('express');
var multiparty = require('multiparty');
var multipart = require('connect-multiparty');
var router = express.Router();
var ctrlAuth = require('../controllers/authentication');
var ctrlUsers = require('../controllers/users.controller');
var roomFunctions = require('../controllers/roomFunk');
var messageControls = require('../controllers/messages.controller');
var ctrlFile = require('../controllers/fileUpload.controller');
//var multipartyMiddleware = multiparty();

// Users
router.get('/users', ctrlUsers.getAllUsers);
router.get('/users/:id', ctrlUsers.getUser);
router.put('/users/:id', ctrlUsers.editUser);
router.put('/users/color/:id', ctrlUsers.changeUserColor);

// Auth
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// Rooms
router.get('/rooms', roomFunctions.getPublicRooms);
router.get('/rooms/:userid', roomFunctions.getUserRooms);
router.post('/createRoom', roomFunctions.createRoom);
router.get('/room/:roomid/', roomFunctions.getRoom);
router.put('/updateVideo/:roomid/', roomFunctions.updateVideo);
router.put('/room/:roomId', roomFunctions.editRoom);
router.put('/togglePlaylist/:roomid', roomFunctions.togglePlaylist);

// Message
router.post('/saveMessage', messageControls.saveMessage);
router.get('/getMessages/:roomid', messageControls.getMessages);

//Upload
router.post('/uploads', ctrlFile.uploadFile);

module.exports = router;