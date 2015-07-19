teachy.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html'
		})

		.when('/signup', {
			templateUrl: 'partials/signup.html'
		})
})
