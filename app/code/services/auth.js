
authProvider.$inject = ['session', 'api'];

function authProvider(session, api){
	var auth = {
		token: null
	};
	
	auth.login = function(email, password){
		api.request({
			method: 'POST',
			uri: '/login',
			notoken: true,
			data: {
				email: email,
				password: password
			}
		}).then(function(result){
			session.setToken(result.token);
		});
	};
	
	auth.logout = function(){
		session.destroy();
	};
	
	return auth;
}

module.exports = authProvider;
