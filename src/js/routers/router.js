
var Backbone = require('backbone');

var LayoutView = require('../views/LayoutView');
var HomeView = require('../views/HomeView');
var StatusView = require('../views/StatusView');

module.exports = Backbone.Router.extend({

    initialize: function () {
        console.log('router init');
        this.layout = new LayoutView();
        this.layout.render();
    },

    routes: {
        'status': 'status',
        '*path': 'defaultRoute'
    },

    status: function () {
        this.view = new StatusView();
        this.layout.regions['content'].html(this.view.render().el);
    },

    defaultRoute: function () {
        this.view = new HomeView();
        this.layout.regions['content'].html(this.view.render().el);
    }
    
});

