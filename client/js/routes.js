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
		.when('/newtopic',{
              templateUrl:'partials/new_topic.html'
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
		.when('/admins',{
              templateUrl:'partials/new_admin.html'
		})
		.when('/homes',{
              templateUrl:'partials/homepage.html'
		})
		.when('/confirm', {
			templateUrl: 'partials/emails.html'
		})
		.when('/homepage',{
              templateUrl:'partials/homepage.html'
		})
		.when('/directory',{
              templateUrl:'partials/directory.html'
		})
		.otherwise({
			redirectTo: '/'
		})
})

