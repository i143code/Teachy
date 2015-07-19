teachy.controller('loginCtrl', function(socket, $scope, $routeParams, loginFactory, chatFactory ,$window){

	if ($routeParams.userinfo) {
		$scope.createAccount = $routeParams.userinfo // This variable name will change once the API is integrated
	}

	$scope.subject = [];
	$scope.grades = [];

	$scope.$watch('createAccount.zip', function(){
		loginFactory.retrieveDistrictSchools($scope.createAccount.zip, function(retrievedSchools){
			$scope.schools = retrievedSchools.schoolList;
			$scope.createAccount.district_id = retrievedSchools.districtId;
			if ($scope.schools.length > 0) {
				$scope.schoolsreturned = true;
			} else {
				$scope.schoolsreturned = false;
			}
		})
	})
	
	$scope.login = function(){
		loginFactory.login($scope.login.password, $scope.login.email, function(success){
			if (success.error) {
				$scope.error = success.error;
			} else if (success) {
				chatFactory.setUser(success);
				$window.location.href = '#/homepage';
			}
		})
	}

	$scope.createAccount = function(){
		loginFactory.createAccount($scope.createAccount.email, $scope.createAccount.school, function(success){
			if (success.error) {
				$scope.error = success.error;
			} else if (success) {
				$window.location.href = '#/checkemail';
			}
		})
	}

	$scope.finishSignUp = function() {
		$window.location.href = '#/finishsignup2'
	}

	$scope.addGradeTaught = function(grade) {
		$scope.createAccount.grades.push(grade);
	}

	$scope.addSubjectTaught = function(subject) {
		$scope.createAccount.subjects.push(subject);
	}

	$scope.addPassword = function() {
		$scope.createAccount.password = $scope.password;
		loginFactory.createTeacher($scope.createAccount, function(success){
			if (success.error) {
				$scope.error = success.error;
			} else if (success) {
				$window.location.href = '#/invitecolleagues';
			}
		})
	}

})