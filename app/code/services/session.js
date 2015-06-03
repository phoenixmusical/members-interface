
var COOKIE_NAME = 'phoenixmusical';

sessionProvider.$inject = ['$cookies'];

function sessionProvider($cookies){
	
	return {
		setToken: function(token){
			$cookies[COOKIE_NAME] = token;
		},
		destroy: function(){
			$cookies[COOKIE_NAME] = null;
		},
		requireToken: function(){
			var token = $cookies[COOKIE_NAME];
			if(token){
				return token;
			}
			//TODO redirect to login
		}
	};
}

module.exports = sessionProvider;
