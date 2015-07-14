
var Backbone = require('backbone');

var LayoutView = require('../views/LayoutView');
var DashboardView = require('../views/DashboardView');
var GuardianView = require('../views/GuardianView');

module.exports = Backbone.Router.extend({

    initialize: function () {
        this.nav = this.navigate.bind(this);
        this.layout = new LayoutView();
        this.layout.render();
    },

    routes: {
        'status/:system/:username': 'status',
        'dashboard': 'dashboard'
    },

    status: function (system, username) {
        this.setRegion('content', new GuardianView({
            nav: this.nav
        }));
    },

    dashboard: function () {
        this.setRegion('content', new DashboardView({
            nav: this.nav
        }));
    },

    setRegion: function (region, view) {
        if (this.view) this.view.remove();
        this.view = view;
        this.layout.regions[region].html(view.render().el);
    }
    
});

