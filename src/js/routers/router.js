
var Backbone = require('backbone');
Backbone.$ = require('jquery');

var HomeView = require('../views/HomeView');

module.exports = Backbone.Router.extend({

    routes: {
        '*path': 'defaultRoute'
    },

    defaultRoute: function () {
        this.view = new HomeView();
    }
    
});

