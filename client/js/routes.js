teachy.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html'
		})
		.when('/signup', {
			templateUrl: 'partials/signup.html'
		})
		
		.when('/signup2',{
              templateUrl:'partials/signup2.html'
		})	
		.when('/signup3',{
              templateUrl:'partials/signup3.html'
		})
		.when('/signup4',{
              templateUrl:'partials/signup4.html'
		})
		.when('/home',{
              templateUrl:'partials/home.html'
		})
		.when('/confirm', {
			templateUrl: 'partials/emails.html'
		})
		.when('/homepage',{
              templateUrl:'partials/homepage.html'
		})
		.otherwise({
			redirectTo: '/'
		})
})

