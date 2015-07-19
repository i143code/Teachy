teachy.controller('chatCtrl', function(socket, $scope, $routeParams, chatFactory) {

	console.log('chatCtrl');		
	
	$scope.current;
	$scope.channel;
	$scope.user_id;
	$scope.userFirstName;
	$scope.userLastName;
	$scope.district;
	$scope.joined;

	chatFactory.getUser(function(retrievedUser){
		$scope.userFirstName = retrievedUser.first_name;
		$scope.userLastName = retrievedUser.last_name;
		$scope.fullName = $scope.userFirstName + " " + $scope.userLastName;
		$scope.user_id = retrievedUser._id;
		$scope.joined = retrievedUser.channels;
		chatFactory.retrieveDistrict(retrievedUser.district, function(retrievedDistrict) {
			$scope.district = retrievedDistrict;
			var search = { found: false, idx: 0 };
			for (var i = 0; i < retrievedDistrict.channels.length; i++) {
				if (retrievedDistrict.channels[i].name === "district") {
					search.found = true;
					search.idx = i;
				}
			}
			$scope.current = search.idx;
			$scope.channel = $scope.district.channels[$scope.current];
			console.log($scope.channel);
			chatFactory.joinChannel($scope.district._id, $scope.channel.name, $scope.fullName, $scope.user_id, function(updatedChannel){
				if (updatedChannel.error) {
					console.log(updatedChannel.error)
				} else {
					$scope.channel = updatedChannel;
					console.log($scope.joined);
					$scope.joined.push({name: $scope.channel.name})
				}
			})
		})
	})

	// Implemented before login was working, leaving just in case

	// chatFactory.retrieveUser('55ab5648c76c77bfc04a5214', function(retrievedUser) {
	// 	$scope.userFirstName = retrievedUser.first_name;
	// 	$scope.userLastName = retrievedUser.last_name;
	// 	$scope.fullName = $scope.userFirstName + " " + $scope.userLastName;
	// 	$scope.user_id = retrievedUser._id;
	// 	console.log($scope.userFirstName, $scope.userLastName, $scope.user_id)
	// })

	// chatFactory.retrieveDistrict('55ab5f06eb20c40ca267104d', function(retrievedDistrict) {
	// 	$scope.district = retrievedDistrict;
	// 	var search = { found: false, idx: 0 };
	// 	for (var i = 0; i < retrievedDistrict.channels.length; i++) {
	// 		if (retrievedDistrict.channels[i].name === "district") {
	// 			search.found = true;
	// 			search.idx = i;
	// 		}
	// 	}
	// 	$scope.current = search.idx;
	// 	$scope.channel = $scope.district.channels[$scope.current];
	// })

	$scope.updateChat = function() {
		chatFactory.updateChat($scope.district._id, $scope.district.channels[$scope.current].name, function(updatedChat){
			$scope.channel = updatedChat;
		})
	}

	$scope.createMessage = function() {
		console.log('we are here');
		console.log($scope.district._id);
		console.log($scope.current);
		console.log($scope.district.channels[$scope.current]);
		chatFactory.createMessage($scope.district._id, $scope.district.channels[$scope.current].name, $scope.fullName, $scope.createdMessage, function(updatedChat){
			$scope.channel = updatedChat;
			$scope.createdMessage = '';
		})
		socket.emit('new_message', {channel: $scope.channel.name, user: $scope.fullName, district: $scope.district._id})
	}

	$scope.switchChannel = function(channel) {
		if (!$scope.switchedChannel) {
			$scope.switchedChannel = channel;
		}
		console.log($scope.switchedChannel);
		chatFactory.retrieveChannel($scope.district._id, $scope.switchedChannel, function(newChannel){
			$scope.channel = newChannel;
			$scope.switchedChannel = '';
			chatFactory.retrieveDistrict($scope.district._id, function(retrievedDistrict) {
				$scope.district = retrievedDistrict;
				var search = { found: false, idx: 0 };
				for (var i = 0; i < retrievedDistrict.channels.length; i++) {
					if (retrievedDistrict.channels[i].name === $scope.channel.name) {
						search.found = true;
						search.idx = i;
					}
				}
				$scope.current = search.idx;
				$scope.channel = $scope.district.channels[$scope.current];
				chatFactory.joinChannel($scope.district._id, $scope.channel.name, $scope.fullName, $scope.user_id, function(updatedChannel){
					if (updatedChannel.error) {
					console.log(updatedChannel.error)
				} else {
					$scope.channel = updatedChannel;
					console.log($scope.joined);
					$scope.joined.push({name: $scope.channel.name})
				}
				})
			})
		})
	}

	$scope.createChannel = function() {
		chatFactory.createChannel($scope.district._id, $scope.user_id, $scope.newChannel, function(createdChannel){
			$scope.channel = createdChannel;
			chatFactory.retrieveDistrict($scope.district._id, function(retrievedDistrict) {
				$scope.district = retrievedDistrict;
				var search = { found: false, idx: 0 };
				for (var i = 0; i < retrievedDistrict.channels.length; i++) {
					if (retrievedDistrict.channels[i].name === $scope.channel.name) {
						search.found = true;
						search.idx = i;
					}
				}
				$scope.current = search.idx;
				$scope.channel = $scope.district.channels[$scope.current];
				chatFactory.joinChannel($scope.district._id, $scope.channel.name, $scope.fullName, $scope.user_id, function(updatedChannel){
					if (updatedChannel.error) {
						console.log(updatedChannel.error)
					} else {
						$scope.channel = updatedChannel;
						console.log($scope.joined);
						var chanSearch = { found: false, idx: 0 };
						for (var x = 0; x < $scope.joined.length; x++) {
							if ($scope.joined[x].name === $scope.channel.name) {
								chanSearch.found = true
							}
						}
						if (!chanSearch.found){
							$scope.joined.push({name: $scope.channel.name})
						}
					}
				})
			})
		})
	}

	$scope.createDirectMessage = function() {
		chatFactory.createDirectMessage($scope.newDirectMessage, function(createdDirectMessage){
			$scope.channel = createdDirectMessage;
		})
	}

	$scope.createInviteOnlyTopic = function() {
		chatFactory.createInviteOnlyTopic($scope.newInviteOnlyTopic, function(createdInviteOnlyTopic){
			$scope.channel = cratedInviteOnlyTopic;
		})
	}

	// Here we will define all of our socket events

	socket.on('update_chat', function(data){
		chatFactory.retrieveDistrict('55ab5f06eb20c40ca267104d', function(retrievedDistrict) {
				$scope.district = retrievedDistrict;
				var search = { found: false, idx: 0 };
				for (var i = 0; i < retrievedDistrict.channels.length; i++) {
					if (retrievedDistrict.channels[i].name === $scope.channel.name) {
						search.found = true;
						search.idx = i;
					}
				}
				$scope.current = search.idx;
				$scope.channel = $scope.district.channels[$scope.current];
			})
	})

})