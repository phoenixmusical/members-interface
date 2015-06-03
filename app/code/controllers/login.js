
LoginCtrl.$inject = ['$scope', 'auth'];

function LoginCtrl($scope, auth){
	
	$scope.login = function(){
		auth.login($scope.email, $scope.password);
	};
}

module.exports = LoginCtrl;
