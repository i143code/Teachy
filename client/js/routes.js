teachy.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html'
		})

		.when('/signup', {
			templateUrl: 'partials/signup.html'

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
			// redirectTo: '/'
		})
})
