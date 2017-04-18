var mongoose = require("mongoose");

var videoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	id: {
		type: String,
		required: true
	}
});

mongoose.model('CurrentVideo', videoSchema);

var roomSchema = new mongoose.Schema({
	roomName: {
		type: String,
		unique: true,
		required: true
	},
	description: {
		type: String,
		default: "This is your room's description."
	},
	admin: {
		type: String,
		required: true,
		default: ["test"]
	},
	public: {
		type: Boolean,
		required: true,
		default: false
	},
	thumbnail: {
		type: String
	},
	playlist: {
		type: Boolean,
		required: true,
		default: false
	},
	playlistId:{
		type: String
	},
	currentUsers: {
		type: Number,
		required: true,
		default: 0
	},
	userLimit: {
		type: Number,
		required: true,
		default: 10
	},
	currentUsers: {
		type: Number,
		required: true,
		default: 0
	},
	tags: {
		type: [String]
	},
	currentVideo: {
		type: videoSchema,
		required: true,
		default: {
			title: 'BLASPHEMY- "War Command"',
			id: 'JGbvN25xs1w'
		}
	}
});

mongoose.model('Room', roomSchema);