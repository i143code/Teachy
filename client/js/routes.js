teachy.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html'
		})
<<<<<<< HEAD

		.when('/signup', {
			templateUrl: 'partials/signup.html'

=======
>>>>>>> 48b13e92216c982ddfb9ee36d3e3a0333c007bc4
		.when('/checkemail', {
			templateUrl: 'partials/checkemail.html'
		})
		.when('/finishsignup1', {
			templateUrl: 'partials/finishsignup1.html'
		})
		.when('/finishsignup2', {
			templateUrl: 'partials/finishsignup2.html'
		})
		.when('/finishsignup3', {
			templateUrl: 'partials/finishsignup3.html'
		})
		.when('/invitecolleagues', {
			templateUrl: 'partials/invitecolleagues.html'
		})
		.when('/chat', {
			templateUrl: 'partials/chat.html'
		})
		.otherwise({
<<<<<<< HEAD
			// redirectTo: '/'
=======
			redirectTo: '/'
>>>>>>> 48b13e92216c982ddfb9ee36d3e3a0333c007bc4
		})
})
