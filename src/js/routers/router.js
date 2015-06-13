
var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = Backbone.Router.extend({

    routes: {
        '*path': 'defaultRoute'
    },

    defaultRoute: function () {
        console.log('default route');
    }
    
});

