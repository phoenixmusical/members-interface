var angular = require('angular');
var ngRoute = require('angular-route');

var app = angular.module('app', [require('angular-route'), require('angular-messages'), require('angular-cookies')]);

app.config(require('./router'));
app.run(require('./run'));

app.factory('session', require('./services/session'));
app.factory('api', require('./services/api'));
app.factory('auth', require('./services/auth'));

app.controller('HomeCtrl', require('./controllers/home'));
app.controller('LoginCtrl', require('./controllers/login'));
app.controller('PostsCtrl', require('./controllers/posts'));
app.controller('UserProfileCtrl', require('./controllers/user-profile'));
app.controller('UsersSettingsCtrl', require('./controllers/users-settings'));
app.controller('ComitiesSettingsCtrl', require('./controllers/comities-settings'));
