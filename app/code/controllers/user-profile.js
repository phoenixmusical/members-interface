
UserProfileCtrl.$inject = ['$scope', 'api', 'auth'];

function UserProfileCtrl($scope, api, auth){
	$scope.form = {};
	
	function setForm(user){
		$scope.form = {
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email
		};
	}
	
	auth.getUser().then(setForm);
	
	$scope.save = function(){
		auth.getUser()
			.then(function(user){
				return api.post(user._href, $scope.form).then(function(result){
					for(var key in result){
						user[key] = result[key];
					}
					console.log('user', user);
					setForm(user);
				});
			})
			.then(null, function(err){
				$scope.errorMessage = "Une erreur s'est produite lors de la sauvegarde.";
			});
	};
}

module.exports = UserProfileCtrl;