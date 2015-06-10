
ComitiesSettingsCtrl.$inject = ['$scope', 'api'];

function ComitiesSettingsCtrl($scope, api){
	$scope.newComity = {};
	$scope.comities = [];
	$scope.addInProgress = false;
	
	api.get('/comities').then(function(comities){
		$scope.comities = comities;
	});
	
	$scope.addComity = function(){
		$scope.addInProgress = true;
		api.post('/comities', $scope.newComity).then(function(comity){
			$scope.newComity = {};
			$scope.comities.push(comity);
			$scope.addInProgress = false;
		}, function(err){
			console.error(err);
			$scope.errorMessage = "Une erreur est survenue lors de la sauvegarde";
		});
	};
}

module.exports = ComitiesSettingsCtrl;