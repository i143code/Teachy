teachy.controller('chatCtrl', function($scope, $routeParams){
	
	$scope.current;
	$scope.messages = [];
	$scope.users = [];
	$scope.user_id;
	$scope.userFirstName;
	$scope.userLastName;
	$scope.district;

	chatFactory.retrieveUser($routeParams.userId, function(retrievedUser){
		$scope.userFirstName = retrievedUser.first_name;
		$scope.userLastName = retrievedUser.last_name;
		$scope.user_id = retrievedUser._id;
	})

	chatFactory.retrieveDistrict($routeParams.districtId, function(retrievedDistrict){
		$scope.district = retrievedDistrict;
		var search = { found: false, idx: 0 };
		for (var i = 0; i < retrievedDistrict.channels.length; i++) {
			if (retrievedDistrict.channels[i].name === "district") {
				search.found = true;
				search.idx = i;
			}
		}
		$scope.current = search.idx;
		$scope.messages = $scope.district.channels[$scope.current].messages
		$scope.users = $scope.district.channels
	})

	$scope.updateChat = function(){
		chatFactory.updateChat(function(updatedChat){
			$scope.messages
		})
	}

})