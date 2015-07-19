var ChannelController = require('../server/controllers/channelController.js');
var TeacherController = require('../server/controllers/teacherController.js');
var DistrictController = require('../server/controllers/districtController.js');

module.exports = function(app){
	
	// Teacher Routes

	app.post('/teachers/:id/update', function(req, res){
		TeacherController.updateTeacher(req, res);
	})

	app.get('/teachers/:id/show', function(req, res){
		TeacherController.retrieveTeacher(req, res);
	})

	app.post('/teachers/new', function(req, res){
		TeacherController.createTeacher(req, res);
	})

	app.post('/login', function(req, res){
		TeacherController.loginTeacher(req, res);
	})

	// Channel Routes
	app.post('/channels/:district/new', function(req, res){
		// For creating a room that doesn't exist
		ChannelController.createChannel(req, res);
	})

	app.get('/channels/:district/:channel/show', function(req, res){
		// For getting information about a specific room
		ChannelController.retrieveChannel(req, res);
	})

	app.post('/channels/:district/:channel/update', function(req, res){
		// For entering or exiting room
		RoomController.updateChannel(req, res);
	})

	app.get('/channels/:district/all', function(req, res){
		// For showing all rooms for a district
		ChannelController.retrieveChannels(req, res);
	})

	// District Routes (Necessary?)
	app.get('/districts/:id/show', function(req, res){
		DistrictController.retrieveDistrict(req, res);
	})

	app.get('/districts/show', function(req, res){
		DistrictController.retrieveDistricts(req, res);
	})

}