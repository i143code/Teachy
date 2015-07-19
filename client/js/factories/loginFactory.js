teachy.factory('loginFactory', function($http){
	
	var factory = {};

	factory.createAccount = function(userEmail, callback){
		// var req = {
		// 	method: 'POST',
		// 	host: 'https://api.sparkpost.com/api/v1?recipients='+userEmail+'&return_path=signup@email.teachy.co&template_id=verify-email',
		// 	headers: {
		// 		'Content-type': 'application/json',
		// 		'Authorization': 'bb131006635c2ed2e5517ac52b6890f51d41787e'
		// 	}
		// }

		// $http(req)
		// 	.success(function(response){
		// 		console.log(response);
		// 		callback(response)
		// 	})
	
		$http.post('/signup', {userEmail: userEmail})
			.success(function(response){
				console.log(response);
			})

	}

	factory.retrieveDistrictSchools = function(zipToSearch, callback){
		$http.get('/district/'+zipToSearch+'/show')
			.success(function(schoolsFound){
				callback(schoolsFound);
			})
	}

	factory.login = function(password, email, callback){
		$http.post('/login', {email: email, password: password})
			.success(function(loggedInTeacher){
				callback(loggedInTeacher);
			})
	}

	return factory;

})