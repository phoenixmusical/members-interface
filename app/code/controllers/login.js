
LoginCtrl.$inject = ['$scope', '$location', 'auth'];

function LoginCtrl($scope, $location, auth){
	
	$scope.login = function(){
		$scope.errorMessage = "";
		auth.login($scope.email, $scope.password).then(function(){
			$location.path('/');
		}, function(err){
			if(err.code === 'InvalidCredentials'){
				$scope.errorMessage = "Courriel ou mot de passe invalide";
			}else{
				$scope.errorMessage = "Une erreur est survenue.";
			}
		});
	};
}

module.exports = LoginCtrl;
