
HomeController.$inject = ['$scope', 'api'];

function HomeController($scope, api){
	
	api.get('/comities').then(function(comities){
		$scope.comities = comities;
	});
}

module.exports = HomeController;