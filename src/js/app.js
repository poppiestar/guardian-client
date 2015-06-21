
var Backbone = require('backbone');
Backbone.$ = require('jquery');

var Router = require('./routers/router');

// start router
new Router();

Backbone.history.start({ pushState: true });

