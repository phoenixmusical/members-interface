
UsersSettingsCtrl.$inject = ['$scope', 'api'];

function UsersSettingsCtrl($scope, api){
	
	api.get('/users').then(function(users){
		$scope.users = users;
	});
}

module.exports = UsersSettingsCtrl;