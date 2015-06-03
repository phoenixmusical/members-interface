
var API_URL = 'http://localhost:3001';

apiProvider.$inject = ['$http', 'session'];

function apiProvider($http, auth){
	return {
		request: function(options){
			var headers = {};
			var req = {};
			req.method = options.method || 'GET';
			req.url = API_URL + options.uri;
			if(options.data){
				req.data = options.data;
			}
			if(!options.notoken){
				req.headers = {
					'X-Token': session.requireToken()
				};
			}
			return $http(req);
		},
		get: function(uri, options){
			options = options||{};
			options.method = 'GET';
			options.uri = uri;
			return this.request(options);
		},
		post: function(uri, data, options){
			options = options||{};
			options.method = 'POST';
			options.uri = uri;
			return this.request(options);
		}
	};
}

module.exports = apiProvider;
