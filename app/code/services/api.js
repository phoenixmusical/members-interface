
var API_URL = 'http://localhost:3001';

apiProvider.$inject = ['$http', 'session'];

function apiProvider($http, session){
	return {
		request: function(options){
			var req = {
				headers: {}
			};
			req.method = options.method || 'GET';
			req.url = options.uri.substr(0, 4) === 'http' ? options.uri : API_URL + options.uri;
			if(options.data){
				req.data = options.data;
			}
			if(!options.notoken){
				req.headers['X-Token'] = session.requireToken();
			}
			return $http(req).then(function(result){
				if(result.status >= 200 && result.status < 300){
					return result.data;
				}
				throw new Error("Invalid result from API");
			}, function(receivedError){
				if(receivedError && receivedError.data && receivedError.config){
					console.error('API error %d %s (%s)', receivedError.status, receivedError.statusText, receivedError.config.url);
					var err = new Error(receivedError.data.message || receivedError.data.code);
					if(receivedError.data.code){
						err.code = receivedError.data.code;
					}
					throw err;
				}else{
					console.error('API error', receivedError);
					throw receivedError;
				}
			});
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
			options.data = data||{};
			return this.request(options);
		}
	};
}

module.exports = apiProvider;
