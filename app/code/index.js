var angular = require('angular');
var ngRoute = require('angular-route');

var app = angular.module('app', [require('angular-route'), require('angular-messages'), require('angular-cookies')]);

app.config(require('./router'));

app.factory('session', require('./services/session'));
app.factory('api', require('./services/api'));
app.factory('auth', require('./services/auth'));

app.controller('LoginCtrl', require('./controllers/login'));
