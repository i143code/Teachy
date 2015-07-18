module.exports = function(app){
	
	// Teacher Routes
	app.post('/teachers/new', function(req, res){
		TeacherController.createTeacher(req, res);
	})

	app.get('/teachers/:id/show', function(req, res){
		TeacherController.retrieveTeacher(req, res);
	})

	// Room Routes
	app.post('/rooms/new', function(req, res){
		// For creating a room that doesn't exist
		RoomController.createRoom(req, res);
	})

	app.get('/rooms/:id/show', function(req, res){
		// For getting information about a specific room
		RoomController.retrieveRoom(req, res);
	})

	app.post('/rooms/:id/update', function(req, res){
		// For entering or exiting room
		RoomController.updateRoom(req, res);
	})

	app.get('/rooms/:district/show', function(req, res){
		// For showing all rooms for a district
		RoomController.retrieveRooms(req, res);
	})

	app.get('/rooms/:district/:school/show', function(req, res){
		
	})

	// Direct Messages Routes

	app.get('/directmessages/:id/show', function(req, res){
		// For getting direct messages of a single user
		DMController.retrieveMessages(req, res);
	})

	app.post('/directmessages/:id/new', function(req, res){
		// For sending a new direct message to a user
		DMController.createMessage(req, res);
	})

}