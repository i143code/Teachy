var io = require('socket.io');

module.exports = function(server){
	
	io.sockets.on('connection', function(socket){

		console.log('New Socket Connection:', socket.id)

	})

}