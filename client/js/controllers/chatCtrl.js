teachy.controller('chatCtrl', function($scope, $routeParams, chatFactory) {
	
	$scope.current;
	$scope.channel;
	$scope.user_id;
	$scope.userFirstName;
	$scope.userLastName;
	$scope.district;

	chatFactory.retrieveUser($routeParams.userId, function(retrievedUser) {
		$scope.userFirstName = retrievedUser.first_name;
		$scope.userLastName = retrievedUser.last_name;
		$scope.user_id = retrievedUser._id;
	})

	chatFactory.retrieveDistrict($routeParams.districtId, function(retrievedDistrict) {
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
	})

	$scope.updateChat = function() {
		chatFactory.updateChat(function(updatedChat){
			$scope.channel = updatedChat;
		})
	}

	$scope.createMessage = function() {
		chatFactory.createMessage($scope.newMessage, function(updatedChat){
			$scope.channel = updatedChat;
		})
	}

	$scope.switchChannel = function() {
		chatFactory.retrieveChannel($scope.channel, function(newChannel){
			$scope.channel = newChannel;
		})
	}

	$scope.createChannel = function() {
		chatFactory.createChannel($scope.newChannel, function(createdChannel){
			$scope.channel = createdChannel;
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

})