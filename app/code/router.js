
routeConfig.$inject = ['$routeProvider'];

function routeConfig($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'HomeCtrl',
			templateUrl: 'views/home.html'
		})
		.when('/login', {
			controller: 'LoginCtrl',
			templateUrl: 'views/login.html'
		})
		.when('/posts/:id', {
			controller: 'PostsCtrl',
			templateUrl: 'views/posts.html'
		})
		.when('/user-profile', {
			controller: 'UserProfileCtrl',
			templateUrl: 'views/user-profile.html'
		})
		.when('/users-settings', {
			controller: 'UsersSettingsCtrl',
			templateUrl: 'views/users-settings.html'
		})
		.when('/comities-settings', {
			controller: 'ComitiesSettingsCtrl',
			templateUrl: 'views/comities-settings.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}

module.exports = routeConfig;
