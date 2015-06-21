
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = require('jquery');

var template = require('../templates/Status.html');

module.exports = Backbone.View.extend({

    id: 'guardianStatus',

    template: _.template(template),

    initialize: function () {
        this.render();
    },

    render: function () {
        Backbone.$(document.body).html( this.$el.html(this.template({ username: 'Drew', status: 'Available' })) );

        return this;
    }

});

