
PostsCtrl.$inject = ['$scope', '$routeParams', 'api'];

function PostsCtrl($scope, $routeParams, api){
	api.get('/comities/'+$routeParams.id)
		.then(function(comity){
			$scope.comity = comity;
		});
	
	$scope.posts = [];
	api.get('/comities/'+$routeParams.id+'/posts')
		.then(function(posts){
			$scope.posts = posts;
		});
	
	$scope.addInProgress = false;
	$scope.newPost = {
		name: ""
	};
	$scope.saveNewPost = function(){
		$scope.addInProgress = true;
		api.post('/comities/'+$routeParams.id+'/posts', $scope.newPost).then(function(post){
			$scope.newPost = {};
			$scope.posts.push(post);
			$scope.addInProgress = false;
		}, function(err){
			console.error(err);
			$scope.errorMessage = "Une erreur est survenue lors de la sauvegarde";
		});
	};
}

module.exports = PostsCtrl;
