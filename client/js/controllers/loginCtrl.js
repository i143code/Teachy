teachy.controller('loginCtrl', function($scope, $routeParams, loginFactory, $window){

	if ($routeParams.userinfo) {
		$scope.createAccount = $routeParams.userinfo // This variable name will change once the API is integrated
	}
	
	$scope.login = function(){
		loginFactory.login($scope.login, function(success){
			if (success.error) {
				$scope.error = success.error;
			} else if (success) {
				$window.location.href = '#/chat';
			}
		})
	}

	$scope.createAccount = function(){
		loginFactory.createAccount($scope.createAccount, function(success){
			if (success.error) {
				$scope.error = success.error;
			} else if (success) {
				$window.location.href = '#/checkemail';
			}
		})
	}

	$scope.finishSingUp = function() {
		$window.location.href = '#/finishsignup2'
	}

	$scope.addedTeacherInfo = function() {
		$scope.createAccount.first_name = $scope.finishSignup.first_name;
		$scope.createAccount.last_name = $scope.finishSignup.last_name;
		$scope.createAccount.subjects = {subject: $scope.finishSignup.subject, grade: $scope.finishSignup.grade}
		$window.location.href = '#/finishsignup3'
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