
authProvider.$inject = ['session', 'api', '$rootScope', '$q'];

function authProvider(session, api, $rootScope, $q){
	var auth = {};
	var loggedUser = null;
	
	function setUser(user){
		user.isAdmin = user.role === 'admin';
		loggedUser = user;
		$rootScope.user = user;
	}
	
	auth.login = function(email, password){
		return api.request({
			method: 'POST',
			uri: '/auth/login',
			notoken: true,
			data: {
				email: email,
				password: password
			}
		}).then(function(sessionData){
			setUser(sessionData.user);
			session.setToken(sessionData.id);
		});
	};
	
	auth.logout = function(){
		session.destroy();
	};
	
	auth.getUser = function(){
		if(loggedUser){
			return $q.when(loggedUser);
		}
		var token = session.requireToken();
		return api.get('/auth/whoami').then(function(user){
			setUser(user);
			return user;
		}, function(err){
			$location.path('/login');
		});
	};
	
	auth.setUser = function(user){
		setUser(user);
	};
	
	return auth;
}

module.exports = authProvider;
