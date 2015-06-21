
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = require('jquery');

var template = require('../templates/Home.html');

module.exports = Backbone.View.extend({

    el: '#body',

    template: _.template(template),

    events: {
        'submit #login': 'submitForm'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.template());

        return this;
    },

    submitForm: function (e) {
        e.preventDefault();

        Backbone.history.navigate('status', true);
    }

});

