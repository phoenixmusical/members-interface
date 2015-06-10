
var COOKIE_NAME = 'phoenixmusical';

sessionProvider.$inject = ['$cookies', '$location'];

function sessionProvider($cookies, $location){
	
	function getToken(){
		var tokenEncoded = $cookies[COOKIE_NAME];
		if(tokenEncoded){
			try{
				return JSON.parse(tokenEncoded);
			}catch(err){
				return null;
			}
		}
		return null;
	}
	
	return {
		setToken: function(token){
			$cookies[COOKIE_NAME] = JSON.stringify(token);
		},
		destroy: function(){
			$cookies[COOKIE_NAME] = '';
		},
		requireToken: function(){
			var token = getToken();
			if(token){
				return token;
			}
			$location.path('/login');
		}
	};
}

module.exports = sessionProvider;
