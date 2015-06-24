
var Backbone = require('backbone');

var LayoutView = require('../views/LayoutView');
var HomeView = require('../views/HomeView');
var StatusView = require('../views/StatusView');

module.exports = Backbone.Router.extend({

    initialize: function () {
        this.layout = new LayoutView();
        this.layout.render();
    },

    routes: {
        'status': 'status',
        '*path': 'defaultRoute'
    },

    status: function () {
        this.setRegion('content', new StatusView());
    },

    defaultRoute: function () {
        this.setRegion('content', new HomeView());
    },

    setRegion: function (region, view) {
        if (this.view) this.view.remove();
        this.view = view;
        this.layout.regions[region].html(view.render().el);
    }
    
});

