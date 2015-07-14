
var Backbone = require('backbone');
var _ = require('underscore');

var template = require('../templates/Dashboard.html');

module.exports = Backbone.View.extend({

    initialize: function (options) {
        this.nav = options.nav;
    },

    template: _.template(template),

    events: {
        'submit #login': 'submitForm'
    },

    render: function () {
        this.$el.html(this.template());

        return this;
    },

    submitForm: function (e) {
        e.preventDefault();

        console.log(this.nav);
        this.nav('status', true);
    }

});

