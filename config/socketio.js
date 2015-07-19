module.exports = function(server){

	var io = require('socket.io').listen(server);
		
	io.sockets.on('connection', function(socket){

		console.log('New Socket Connection:', socket.id)

		socket.on('new_message', function(data){
			io.emit('update_chat');
		})

	})

}