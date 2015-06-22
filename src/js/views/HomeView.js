
var Backbone = require('backbone');
var _ = require('underscore');

var template = require('../templates/Home.html');

module.exports = Backbone.View.extend({

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

        Backbone.history.navigate('status', true);
    }

});

