teachy.factory('chatFactory', function($http){
	
	var user;

	var factory = {}

	factory.setUser = function(retrievedUser){
		user = retrievedUser;
	}

	factory.getUser = function(callback){
		callback(user);
	}

	factory.retrieveUser = function(user_id, callback){
		$http.get('/teachers/'+user_id+'/show')
			.success(function(retrievedUser){
				callback(retrievedUser);
			})
	}

	factory.retrieveDistrict = function(district_id, callback){
		$http.get('/districts/'+district_id+'/show')
			.success(function(retrievedDistrict){
				callback(retrievedDistrict);

			})
	}

	factory.updateChat = function(district_id, channel_name, callback){
		console.log('dist_id', district_id);
		$http.get('/channels/'+district_id+'/'+channel_name+'/show')
			.success(function(updatedChat){
				callback(updatedChat);
			})
	}

	factory.createMessage = function(district_id, channel_id, userName, newMessage, callback){
		$http.post('/channels/'+district_id+'/'+channel_id+'/update', {message: newMessage, type: 'newMessage', user: userName})
			.success(function(updatedChat){
				callback(updatedChat)
			})
	}

	factory.retrieveChannel = function(district_id, channel_id, callback){
		$http.get('/channels/'+district_id+'/'+channel_id+'/show')
			.success(function(newRoom){
				callback(newRoom);
			})
	}

	factory.createChannel = function(district_id, creating_user, newChannel, callback){
		$http.post('/channels/'+district_id+'/new', {user_id: creating_user, channelName: newChannel.name, districtWide: newChannel.districtWide, directMessage: false})
			.success(function(createdChannel){
				callback(createdChannel);
			})
	}

	factory.createDirectMessage = function(district_id, creating_user, newChannel, callback){
		$http.post('/channels/'+district_id+'/new', {user_id: creating_user, channelName: newChannel.name, districtWide: false, directMessage: true})
			.success(function(createdDirectMessage){
				callback(createdDirectMessage)
			})
	}

	factory.createInviteOnlyTopic = function(district_id, creating_user, newTopic, callback){
		// TBDone
	}

	factory.joinChannel = function(district_id, channel_id, userName, userId, callback){
		$http.post('/channels/'+district_id+'/'+channel_id+'/update', {type: 'newUser', user: userName, user_id: userId})
			.success(function(updatedChat){
				callback(updatedChat)
			})
	}

	return factory;

})