teachy.factory('chatFactory', function($http){
	
	var factory = {}

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

	factory.updateChat = function(district_id, channel_id, callback){
		$http.get('/channels/'+district_id+'/'+channel_id+'/show')
			.success(function(updatedChat){
				callback(updatedChat);
			})
	}

	factory.createMessage = function(district_id, channel_id, newMessage, callback){
		$http.post('/channels/'+district_id+'/'+channel_id+'/update', newMessage)
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

	return factory;

})