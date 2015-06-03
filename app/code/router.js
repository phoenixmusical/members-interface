
routeConfig.$inject = ['$routeProvider'];

function routeConfig($routeProvider){
	$routeProvider
		.when('/login', {
			controller: 'LoginCtrl',
			templateUrl: 'views/login.html'
		})
		.otherwise({
			redirectTo: '/login'
		});
}

module.exports = routeConfig;
