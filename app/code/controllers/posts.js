
PostsCtrl.$inject = ['$scope', '$routeParams', 'api'];

function PostsCtrl($scope, $routeParams, api){
	api.get('/comities/'+$routeParams.id)
		.then(function(comity){
			$scope.comity = comity;
		});
	
	api.get('/comities/'+$routeParams.id+'/posts')
		.then(function(posts){
			$scope.posts = posts;
		});
}

module.exports = PostsCtrl;